# Use official Java runtime image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy your built jar file (adjust name if needed)
COPY target/server-0.0.1-SNAPSHOT.jar .

# Expose port your app runs on
EXPOSE 8080



ENTRYPOINT ["java","-jar","server-0.0.1-SNAPSHOT.jar"]
