# Full stack development with Spring Boot, React, Material-UI and Webpack

This project demonstrates a full-stack implementation using [Spring Boot Data Rest](http://www.springboottutorial.com/introduction-to-spring-data-rest-using-spring-boot)
to handle the backend wired together with [React](https://facebook.github.io/react/) and 
[Material-UI](https://material-ui.com/) for the frontend rendering. 

While this project is in no way what I would consider "production quality" it does
try to demonstrate more than just the simplistic "hello world" examples. Hopefully you
will find it of use in getting started with these great Web development platform/frameworks.

## view in code sandbox

<iframe src="https://codesandbox.io/embed/new?codemirror=1&highlights=11,12,13,14" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

[codesandbox](https://codesandbox.io/s/github/agilesolutions/react-spring-data-rest)

## Installation
Assuming you have Git and Maven on your local machine you will run the following commands. On the terminal of your
choice change directories to where you want the cloned project files to download and run:

```
git clone https://bitbucket.juliusbaer.com/scm/sbp/spring-data-rest-react.git
```
Since we are using Maven to run/build this project you will execute the following at the project root.

```
mvn spring-boot:run
```
This will compile and startup a Tomcat server on your localhost. In your Web browser go to http://localhost:8080/
and check it out.


## Backend

### Spring Boot

[Spring Boot](https://projects.spring.io/spring-boot/) is the foundation
for the server side. An H2 (in memory Java-based) SQL database is used as the data store. The 
choice of H2 was solely for simplicity of the demo, since no installation is required.
Rounding off the backend is [Spring Data Rest](https://docs.spring.io/spring-data/rest/docs/current/reference/html/) to expose HATEOAS RESTfull resources around Spring Data repositories.

All technologies included on this backend are onboarded as [Spring Boot Starter](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter). You can read more about Spring Boot Starters and get a list of the many that are provided at the link provided. In short though,
as stated:

>Spring Boot Starters are a set of convenient dependency descriptors that you can include 
in your application. You get a one-stop-shop for all the Spring and related technology that you 
need without having to hunt through sample code and copy paste loads of dependency descriptors.

Simply add the Starter you want as a dependency in your POM file and that's it, you're ready to roll.

There are four used here.

|Name                           | Description               
-------------------------------|----------------------------
spring-boot-starter-data-rest  | Starter for exposing Spring Data repositories over REST using Spring Data REST. |
spring-boot-starter-data-jpa   | Starter for using Spring Data JPA with Hibernate.
spring-boot-starter-web        | Starter for building web, including RESTful, applications using Spring MVC. Uses Tomcat as the default embedded container.
spring-boot-starter-mustache   | Starter for building MVC web applications using Mustache views.


#### Structure

```
About Project Structure
------------------------------------------------------------------------

 + 
 - pom.xml
 - package.json
 - webpack.config.js 
 
    + src/main/java/ch.agilesolutions.jdo
        - SecurityFilter
        - JdoApplication
        - ...
        
        + domain
            - Car
            - CarRepository
            - Owner
            - OwnerRepository
            - ...
            
        + web
            - CarController
            - HomeController
    
    + js
        - app.js
        - App.css
        - ....
    
    + resources/templates
        - index.html
        
 ```   


The models and their corresponding `*Repository` interfaces are all contained within 
the "domain" package. Models are simple POJOs with various Spring JPA annotations. Basically, 
every field in your POJO is in turn tied to a column in the DB. It's that easy!

#### MVC

We are following the typical layout specified in the [Spring Boot Docs](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-locating-the-main-class)
with an `Application` class on the root package using a `@SpringBootApplication` annotation to 
explicitly identify our main application class. This class does two things of interest. First it kicks off our Spring
Boot app and second runs the `CommandLineRunner` class to populating the H2 tables.
 
The `WebConfiguration` is also very simple doing one thing. By extending the `RepositoryRestConfigurerAdapter`
class and overriding its `configureRepositoryRestConfiguration` method it routes all of the RESTful API 
endpoints through the "/api" path.

```
http://localhost:8080/api/cars
```

There is a single controller class in the project, `AboutController`, that routes requests to the root path to the
"index.html" page. Which is actually our one Mustache-templated page. It also looks for the first `Person` in our
database and puts it as the model for Mustache to use.

#### Database Population

With Spring Boot there is no need for reading and loading in a SQL file, we can do everything we need to populate
or H2 database - right in Java. Spring has various events that you can hook into and the `HomeLoader` class takes 
advantage of `ContextRefreshedEvent` that is triggered when the `ApplicationContext` gets initialized or refreshed.

## Frontend

The frontend is built using React and Material-UI, which is a set of React components following Google's Material 
Design. The React components call the JPA fed REST endpoints to populate themselves. CSS is generated at build time
from the LESS files in the "styles" directory.

[Webpack2](https://webpack.js.org/guides/get-started/) is used to build and bundle up our Javascript as well as
compiling our LESS files into CSS and injecting into the HTML `head` element. The POM file also contains a
plugin that will install Node, Node Package Manager (NPM) and execute the Webpack build.

## Components

Big aim for each company should be to provide their developer community a library of higher abstraction reusable functional components.

But first you should understand the React Design Concepts behind [SFC Stateless Functional Components](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc) and how to [make a components](https://rangle.github.io/react-training/react-component/).

## Components making up my SFC library are...

1. [mui-datatables](https://github.com/gregnb/mui-datatables)
2. [material ui basis components](https://material-ui.com/getting-started/supported-components/)


