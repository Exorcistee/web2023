package main

import (
	"html/template"
	"log"
	"net/http"
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
	Title       string
	Subtitle    string
	ImgModifier string
	Author      string
	AuthorImg   string
	PublishDate string
}

type mostRecentData struct {
	Title       string
	Subtitle    string
	ImgModifier string
	Author      string
	AuthorImg   string
	PublishDate string
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/index.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
		return                                      // Не забываем завершить выполнение ф-ии
	}

	data := indexPage{
		Title:         "Escape",
		FeaturedPosts: featuredPosts(),
		MostRecent:    mostRecent(),
	}

	err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func post(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/post.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	data := postPage{
		Title:   "The Road Ahead",
		Content: "The road ahead might be paved - it might not be.",
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func featuredPosts() []featuredPostData {
	return []featuredPostData{
		{
			Title:       "The Road Ahead",
			Subtitle:    "The road ahead might be paved - it might not be.",
			ImgModifier: "featured__post_first",
			Author:      "Mat Vogels",
			AuthorImg:   "vogels",
			PublishDate: "September 25, 2015",
		},
		{
			Title:       "From Top Down",
			Subtitle:    "Once a year, go someplace you've never been before.",
			ImgModifier: "featured__post_second",
			Author:      "William Wong",
			AuthorImg:   "wong",
			PublishDate: "September 25, 2015",
		},
	}
}

func mostRecent() []mostRecentData {
	return []mostRecentData{
		{
			ImgModifier: "most-recent__post1",
			Title:       "Still Standing Tall",
			Subtitle:    "Life begins at the end of your comfort zone.",
			Author:      "William Wong",
			AuthorImg:   "wong",
			PublishDate: "9/25/2015",
		},
		{
			ImgModifier: "most-recent__post2",
			Title:       "Sunny Side Up",
			Subtitle:    "No place is ever as bad as they tell you it's going to be.",
			Author:      "Mat Vogels",
			AuthorImg:   "vogels",
			PublishDate: "9/25/2015",
		},
		{
			ImgModifier: "most-recent__post3",
			Title:       "Water Falls",
			Subtitle:    "We travel not to escape life, but for life not to escape us.",
			Author:      "Mat Vogels",
			AuthorImg:   "vogels",
			PublishDate: "9/25/2015",
		},
		{
			ImgModifier: "most-recent__post4",
			Title:       "Through the Mist",
			Subtitle:    "Travel makes you see what a tiny place you occupy in the world.",
			Author:      "William Wong",
			AuthorImg:   "wong",
			PublishDate: "9/25/2015",
		},
		{
			ImgModifier: "most-recent__post5",
			Title:       "Awaken Early",
			Subtitle:    "Not all those who wander are lost.",
			Author:      "Mat Vogels",
			AuthorImg:   "vogels",
			PublishDate: "9/25/2015",
		},
		{
			ImgModifier: "most-recent__post6",
			Title:       "Try it Always",
			Subtitle:    "The world is a book, and those who do not travel read only one page.",
			Author:      "Mat Vogels",
			AuthorImg:   "vogels",
			PublishDate: "9/25/2015",
		},
	}
}
