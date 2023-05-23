FROM mcr.microsoft.com/dotnet/sdk:7.0 as build

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . ./

# Build the project
RUN dotnet build --configuration Release --no-restore

# Publish the project
RUN dotnet publish --configuration Release --no-restore --output

CMD ["dotnet", "run", "--no-build", "--urls", "http://0.0.0.0:5000"]