echo "Exporting environment variable..."
export $(cat ./docker.env | xargs)

echo "Starting postgres container..."
docker compose \
    -f docker-compose.postgres.yml \
    -f docker-compose.restapi.yml up
