NAME = 	ft_transcendance

all: 
		docker compose up -d --build

re: 
		docker compose down && docker compose up -d --build

down:
		docker compose down

in_back: 
		docker exec -it backend /bin/sh

in_front: 
		docker exec -it frontend /bin/sh

in_db: 
		docker exec -it postgresql /bin/sh

check:
		docker ps -a

log:
		docker logs -f backend