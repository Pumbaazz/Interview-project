# FROM mcr.microsoft.com/dotnet/core/aspnet:7.0-alpine as base
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS BUILD
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore
COPY . ./
RUN dotnet build --configuration Release --no-restore
# Publish the project
RUN dotnet publish -c Release -o out

# FROM mcr.microsoft.com/dotnet/sdk:7.0
# WORKDIR /app
# COPY --from=build /app/out .
# ENV DB_HOST=localhost
# ENV DB_PORT=5432
# ENV DB_NAME=Movie
# ENV DB_USER=postgres
# ENV DB_PASSWORD=postgres
# EXPOSE 80

# Add the following lines to run migrations during container startup
# CMD ["dotnet", "ef", "database", "update"]
ENTRYPOINT ["dotnet", "WebAPI.dll"]