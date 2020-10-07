package main

import (
	"fmt"
	"log"
	"net/http"
	"backend/pkg/websocket"
)

//Websocket endpoint
func serverWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)
	fmt.Println("WebSocket Endpoint Hit")

	conn,err := websocket.Upgrade(w, r)
	if err!=nil {
		log.Println(err)
	}

	client := &websocket.Client{
        Conn: conn,
        Pool: pool,
    }

    pool.Register <- client
    client.Read()
}

func setupRoutes() {
	//map http request to websocket connection
	pool := websocket.NewPool()
    go pool.Start()

    http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
        serverWs(pool, w, r)
    })
}

func main() {
	fmt.Println("Chat app version 1.0")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}