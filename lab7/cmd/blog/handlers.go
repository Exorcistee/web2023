package main

import (
	"html/template"
	"log"
	"net/http"
	"github.com/jmoiron/sqlx"
	"database/sql"
	"github.com/gorilla/mux"
)

type indexPage struct {
	Title         string
	FeaturedPosts []featuredPostData
	MostRecent    []mostRecentData
}

type postPage struct {
	Title   string
	Content string
}

type featuredPostData struct {
	ID			string `db:"post_ID`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Image       string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_url"`
	PublishDate string `db:"publish_date"`
	INFO		string `db:"content"`
}

type mostRecentData struct {
	ID			string `db:"post_ID`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Image       string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_url"`
	PublishDate string `db:"publish_date"`
	INFO		string `db:"content"`
}


func index(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
			featuredPosts, err := posts(db)
			if err != nil {
				http.Error(w, "Internal Server Error", 500)
				log.Println(err)
				return
			}
			recentPosts, err := posts(db)
			if err != nil {
				http.Error(w, "Internal Server Error", 500)
				log.Println(err)
				return
			}

			ts, err := template.ParseFiles("pages/index.html")
			if err != nil {
				http.Error(w, "Internal Server Error", 500)
				log.Println(err)
				return
			}

			data := indexPageData{
				FeaturedPosts:   featuredPosts,
				MostRecentPosts: recentPosts,
			}

			err = ts.Execute(w, data)
			if err != nil {
				http.Error(w, "Internal Server Error", 500)
				log.Println(err)
				return
			}
		}
		
}

func featuredPosts(db *sqlx.DB) ([]featuredPostData, error) {
	const query = `
		SELECT
		    post_ID,
			title,
			subtitle,
			image_url,
			'author',
            'author_url',
			publish_date,
			content
		FROM
			post
		WHERE featured = 1
		LIMIT 2
	`

	var featuredPosts []PostData
	err := db.Select(&featuredPosts, query)
	//Select - много записей
	//Get - одна
	if err != nil {
		return nil, err
	}

	return featuredPosts, nil
}

func mostRecent(db *sqlx.DB) ([]recentPosts, error) {
	const query = `
		SELECT
		    post_ID,
			title,
			subtitle,
			image_url,
			'author',
            'author_url',
			publish_date,
			content
		FROM
			post
		WHERE featured = 0
		LIMIT 6
	`

	var recentPosts []mostRecentData

	err := db.Select(&recentPosts, query)
	//Select - много записей
	//Get - одна
	if err != nil {
		return nil, err
	}

	return recentPosts, nil
}

func postPageData(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		orderIDStr := mux.Vars(r)["postID"] // Получаем orderID в виде строки из параметров урла

		postId, err := strconv.Atoi(orderIDStr) // Конвертируем строку orderID в число
		if err != nil {
			http.Error(w, "Invalid post id", 403)
			log.Println(err)
			return
		}

		post, err := postByID(db, postId)
		if err != nil {
			if err == sql.ErrNoRows {
				// sql.ErrNoRows возвращается, когда в запросе к базе не было ничего найдено
				// В таком случае мы возвращем 404 (not found) и пишем в тело, что ордер не найден
				http.Error(w, "Post not found", 404)
				log.Println(err)
				return
			}

			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func order(db *sqlx.DB, Id int) (postPageData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image_url,
			content
		FROM
			post
		WHERE id = ?	
	`

	var order postPageData

	// Обязательно нужно передать в параметрах orderID
	err := db.Get(&post, query, Id)
	if err != nil {
		return postPageData{}, err
	}

	return order, nil
}