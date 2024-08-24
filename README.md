# DevelopsTodayTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

# Instructions

## Dependencies installation

Run `npm i` to install dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## An overview of the application's features and architecture

This is an application written by using Angular v.18 that provides information about countries. The application will allow users to search for countries, view details about their holidays in different years.

The architecture of this Angular project is designed to provide a scalable, modular and easily maintainable application. The application uses a combination of powerful Angular features and best practices to provide a reliable and efficient solution for the task at hand.

RxJS plays a major role in the application.

## Additional libraries or frameworks

This application uses:

1. Angular Material is a UI library component. It helps to design the application in a structured manner. Its components help to construct attractive, consistent, and functional web pages and web applications.
2. RxJS is a library that is deeply integrated into Angular. It is mainly used for composing asynchronous and event-based programs by manipulating observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods to allow handling asynchronous events as collections.
3. ESLint is an open source project that helps find and fix problems with JavaScript code.

# Author's note

In the project I am using SCSS pre-processors.

The search is based on previously fetched data.

During the process of development, in step 5(Configuration and Documentation) task 1(Environment Variables) I took responsibility for using environment files instead of .env. First of all, .env files are not supported by Angular by default. Secondly, I personally do not see the point in installing unnecessary libraries (Dotenv, Webpack) to use .env files. Angular environments configuration files are the best solution for this task as Angular supports them by default.

# Dmytro Krapyvianskyi
