# react-and-spring-data-rest-part

In this section, you will see how to get a bare-bones Spring Data REST application up and running quickly. Then you will build a simple UI on top of it using Facebook's React.js toolset.

## Step 0 - Setting up your environment

Feel free to {sourcedir}/basic[grab the code] from this repository and follow along.

If you want to do it yourself, visit http://start.spring.io and pick these items:

* Rest Repositories
* Thymeleaf
* JPA
* H2
* Lombok (May want to ensure your IDE has support for this as well.)

This demo uses Java 8, Maven Project, and the latest stable release of Spring Boot. It also uses React.js coded in http://es6-features.org/[ES6]. This will give you a clean, empty project. From there, you can add the various files shown explicitly in this section, and/or borrow from the repository listed above.

## In the beginning...

In the beginning there was data. And it was good. But then people wanted to access the data through various means. Over the years, people cobbled together lots of MVC controllers, many using Spring's powerful REST support. But doing over and over cost a lot of time.

Spring Data REST addresses how simple this problem can be if some assumptions are made:

* The developer uses a Spring Data project that supports the repository model.
* The system uses well accepted, industry standard protocols, like HTTP verbs, standardized media types, and IANA-approved link names.

### Declaring your domain

The cornerstone of any Spring Data REST-based application are the domain objects. For this section, you will build an application to track the employees for a company. Kick that off by creating a data type like this:

.src/main/java/com/greglturnquist/payroll/Employee.java
[source,java]
----
include::src/main/java/com/greglturnquist/payroll/Employee.java[tag=code]
----

* `@Entity` is a JPA annotation that denotes the whole class for storage in a relational table.
* `@Id` and `@GeneratedValue` are JPA annotations to note the primary key and that is generated automatically when needed.
* `@Data` is a Project Lombok annotation to autogenerate getters, setters, constructors, toString, hash, equals, and other things. It cuts down on the boilerplate.

This entity is used to track employee information. In this case, their name and job description.

NOTE: Spring Data REST isn't confined to JPA. It supports many NoSQL data stores, but you won't be covering those here.

## Defining the repository

Another key piece of a Spring Data REST application is to create a corresponding repository definition.

.src/main/java/com/greglturnquist/payroll/EmployeeRepository.java
[source,java]
----
include::src/main/java/com/greglturnquist/payroll/EmployeeRepository.java[tag=code]
----

* The repository extends Spring Data Commons' `CrudRepository` and plugs in the type of the domain object and its primary key

That is all that is needed! In fact, you don't even have to annotate this if it's top-level and visible. If you use your IDE and open up `CrudRepository`, you'll find a fist full of pre-built methods already defined.

NOTE: You can define http://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.definition[your own repository] if you wish. Spring Data REST supports that as well.

## Pre-loading the demo

To work with this application, you need to pre-load it with some data like this:

.src/main/java/com/greglturnquist/payroll/DatabaseLoader.java
[source,java]
----
include::src/main/java/com/greglturnquist/payroll/DatabaseLoader.java[tag=code]
----

* This class is marked with Spring's `@Component` annotation so that it is automatically picked up by `@SpringBootApplication`.
* It implements Spring Boot's `CommandLineRunner` so that it gets run after all the beans are created and registered.
* It uses constructor injection and autowiring to get Spring Data's automatically created `EmployeeRepository`.
* The `run()` method is invoked with command line arguments, loading up your data.

One of the biggest, most powerful features of Spring Data is its ability to write JPA queries for you. This not only cuts down on your development time, but also reduces the risk of bugs and errors. Spring Data http://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.details[looks at the name of methods] in a repository class and figures out the operation you need including saving, deleting, and finding.

That is how we can write an empty interface and inherit already built save, find, and delete operations.

## Adjusting the root URI

By default, Spring Data REST hosts a root collection of links at `/`. Because you will host a web UI on the same path, you need to change the root URI.

.src/main/resources/application.properties
----
include::src/main/resources/application.properties[]
----

## Launching the backend

The last step needed to get a fully operational REST API off the ground is to write a `public static void main` using Spring Boot:

.src/main/java/com/greglturnquist/payroll/ReactAndSpringDataRestApplication.java
[source,java]
----
include::src/main/java/com/greglturnquist/payroll/ReactAndSpringDataRestApplication.java[tag=code]
----

Assuming the previous class as well as your Maven build file were generated from http://start.spring.io, you can now launch it either by running that `main()` method inside your IDE, or type `./mvnw spring-boot:run` on the command line. (mvnw.bat for Windows users).

NOTE: If you aren't up-to-date on Spring Boot and how it works, you should consider watch one of https://www.youtube.com/watch?v=sbPSjI4tt10[Josh Long's introductory presentations]. Did it? Press on!

== Touring your REST service

With the app running, you can check things out on the command line using http://curl.haxx.se/[cURL] (or any other tool you like).

----
$ curl localhost:8080/api
{
  "_links" : {
    "employees" : {
      "href" : "http://localhost:8080/api/employees"
    },
    "profile" : {
      "href" : "http://localhost:8080/api/profile"
    }
  }
}
----

When you ping the root node, you get back a collection of links wrapped up in a http://stateless.co/hal_specification.html[HAL-formatted JSON document].

* *_links* is a the collection of links available.
* *employees* points to an aggregate root for the employee objects defined by the `EmployeeRepository` interface.
* *profile* is an IANA-standard relation and points to discoverable metadata about the entire service. We'll explore this in a later section.

You can further dig into this service by navigating the *employees* link.

----
$ curl localhost:8080/api/employees
{
  "_embedded" : {
    "employees" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "description" : "ring bearer",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/employees/1"
        }
      }
    } ]
  }
}
----

At this stage, you are viewing the entire collection of employees.

What's included along with the data you pre-loaded earlier is a *_links* attribute with a *self* link. This is the canonical link for that particular employee. What is canonical? It means free of context. For example, the same user could be fetched through a link like /api/orders/1/processor, in which the employee is assocated with processing a particular order. Here, there is no relationship to other entities.

IMPORTANT: Links are a critical facet of REST. They provide the power to navigate to related items. It makes it possible for other parties to navigate around your API without having to rewrite things everytime there is a change. Updates in the client is a common problem when the clients hard code paths to resources. Restructuring resources can cause big upheavals in code. If links are used and instead the navigation route is maintained, then it becomes easy and flexible to make such adjustments.

You can decide to view that one employee if you wish.

----
$ curl localhost:8080/api/employees/1
{
  "firstName" : "Frodo",
  "lastName" : "Baggins",
  "description" : "ring bearer",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/employees/1"
    }
  }
}
----

Little change here, except that there is no need for the *_embedded* wrapper since there is only domain object.

That's all and good, but you are probably itching to create some new entries.

----
$ curl -X POST localhost:8080/api/employees -d "{\"firstName\": \"Bilbo\", \"lastName\": \"Baggins\", \"description\": \"burglar\"}" -H "Content-Type:application/json"
{
  "firstName" : "Bilbo",
  "lastName" : "Baggins",
  "description" : "burglar",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/employees/2"
    }
  }
}
----

You can also PUT, PATCH, and DELETE as shown in https://spring.io/guides/gs/accessing-data-rest/[this related guide]. But let's not dig into that. You have already spent way too much time interacting with this REST service manually. Don't you want to build a slick UI instead?

## Setting up a custom UI controller

Spring Boot makes it super simple to stand up a custom web page. First, you need a Spring MVC controller.

.src/main/java/com/greglturnquist/payroll/HomeController.java
[source,java]
----
include::src/main/java/com/greglturnquist/payroll/HomeController.java[tag=code]
----

* `@Controller` marks this class as a Spring MVC controller.
* `@RequestMapping` flags the `index()` method to support the `/` route.
* It returns `index` as the name of the template, which Spring Boot's autoconfigured view resolver will map to `src/main/resources/templates/index.html`.

== Defining an HTML template

You are using Thymeleaf, although you won't really use many of its features.

.src/main/resources/templates/index.html
[source,html]
----
include::src/main/resources/templates/index.html[]
----

The key part in this template is the `<div id="react"></div>` component in the middle. It is where you will direct React to plug in the rendered output.

You may also be wondering where that `bundle.js` file came from. The way it's built is shown in the next section.

## Loading JavaScript modules

This section contains the barebones information to get off the JavaScript bits off the ground. While you _can_ install all of JavaScripts command line tools, you don't _have_ to. At least, not yet. Instead, all you need to add is the following to your `pom.xml` build file:

.The `frontend-maven-plugin` used to build JavaScript bits
[source,xml,indent=0]
----
include::pom.xml[tag=frontend-maven-plugin]
----

This little plugin perform multiple steps:

* The `install-node-and-npm` command will install node.js and it's package management tool, `npm`, into the `target` folder. (This ensures the binaries are NOT pulled under source control, and can be cleaned out with `clean`).
* The `npm` command will execute the npm binary with the provided argument (`install`). This installs modules defined in `package.json`.
* The `webpack` command will execute webpack binary, which compiles all the JavaScript code based on `webpack.config.js`.

These steps are run in sequence, essentially installing node.js, downloading JavaScript modules, and building the JS bits.

What modules are installed? JavaScript developers typically use `npm` to build up a `package.json` file like the one below:

.package.json
[source,javascript]
----
include::package.json[]
----

Key dependencies include:

* react.js - toolkit used by this tutorial
* rest.js - CujoJS toolkit used to make REST calls
* webpack - toolkit used to compile JavaScript components into a single, loadable bundle
* babel - write your JavaScript code using ES6 and compile it into ES5 to run in the browser

To build the JavaScript code you'll poke at further down, you need to define a build file for https://webpack.github.io/[webpack].

.webpack.config.js
[source,javascript]
----
include::webpack.config.js[]
----

This webpack configuration file does the following:

* Defines the *entry point* as `./src/main/js/app.js`. In essence, `app.js` (a module we'll write shortly) is the proverbial `public static void main()` of our JavaScript application. webpack must know this in order to know _what_ to launch when the final bundle is loaded by the browser.
* Creates *sourcemaps* so when debugging JS code in the browser, is able to link back to original source code.
* Compile ALL of the JavaScript bits into `./src/main/resources/static/built/bundle.js`, which is a JavaScript equivalent to a Spring Boot uber JAR. All your custom code AND the modules pulled in a la `require()` calls are stuffed into this file.
* It hooks into the babel engine, using both `es2015` and `react` presets, in order to compile ES6 React code into a format able to be run in any standard browser.

For more details on how each of these JavaScript tools operates, please read their corresponding reference docs.

NOTE: Want to see your JavaScript changes automatically? Run `npm run-script watch` to put webpack into watch mode. It will regenerate bundle.js as you edit the source.

With all that in place, you can focus on the React bits which are fetched after the DOM is loaded. It's broken down into parts as below:

Since you are using webpack to assemble things, go ahead and fetch the modules you need:

.src/main/js/app.js
[source,javascript,indent=0]
----
include::src/main/js/app.js[tag=vars]
----

* `React` and `ReactDOM` are the main libraries from Facebook used to build this app.
* `client` is custom code that configures rest.js to include support for HAL, URI Templates, and other things. It also sets the default *Accept* request header to *application/hal+json*. You can https://github.com/spring-guides/tut-react-and-spring-data-rest/blob/master/basic/src/main/js/client.js[read the code here].

## Diving into React

React is based on defining components. Oftentimes, one component can hold multiple instances of another in a parent-child relationship. It's easy for this concept to extend several layers. 

To start things off, it's very handy to have a top level container for all components. (This will become more evident as you expand upon the code throughout this series.) Right now, you only have the employee list. But you might need some other related components later on, so let's start with this:

.src/main/js/app.js - App component
[source,javascript,indent=0]
----
include::src/main/js/app.js[tag=app]
----

* `class Foo extends React.Component{...}` is the method to create a React component.
* `componentDidMount` is the API invoked after React renders a component in the DOM.
* `render` is the API to "draw" the component on the screen.

NOTE: In React, uppercase is the convention for naming components.

In the *App* component, an array of employees is fetched from the Spring Data REST backend and stored in this component's *state* data.

[[NOTE]]
====
React components have two types of data: *state* and *properties*. 

*State* is data that the component is expected to handle itself. It is also data that can fluctuate and change. To read the state, you use `this.state`. To update it, you use `this.setState()`. Every time `this.setState()` is called, React updates the state, calculates a diff between the previous state and the new state, and injects a set of changes to the DOM on the page. This results a fast and efficient updates to your UI. 

The common convention is to initialize state with all your attributes empty in the constructor. Then you lookup data from the server using `componentDidMount` and populate your attributes. From there on, updates can be driven by user action or other events.

*Properties* encompass data that is passed into the component. Properties do NOT change but are instead fixed values. To set them, you assign them to attributes when creating a new component and you'll soon see.

WARNING: JavaScript doesn't lock down data structures like other languages. You can try to subvert properties by assigning values, but this doesn't work with React's differential engine and should be avoided.
====

In this code, the function loads data via `client`, a https://promisesaplus.com/[Promise compliant] instance of rest.js. When it is done retrieving from `/api/employees`, it then invokes the function inside `done()` and set's the state based on it's HAL document (`response.entity._embedded.employees`). You might remember the structure of `curl /api/employees` <<Touring your REST service,earlier>> and see how it maps onto this structure.

When the state is updated, the `render()` function is invoked by the framework. The employee state data is included in creation of the `<EmployeeList />` React component as an input parameter.

Below is the definition for an `EmployeeList`.

.src/main/js/app.js - EmployeeList component
[source,javascript,indent=0]
----
include::src/main/js/app.js[tag=employee-list]
----

Using JavaScript's map function, `this.props.employees` is transformed from an array of employee records into an array of `<Element />` React components (which you'll see a little further down). 

[source,javascript]
----
<Employee key={employee._links.self.href} data={employee} />
----

This shows a new React component (note the uppercase format) being created along with two properties: *key* and *data*. These are supplied the values from `employee._links.self.href` and `employee`.

IMPORTANT: Whenever you work with Spring Data REST, the *self* link IS the key for a given resource. React needs a unique identifer for child nodes, and `_links.self.href` is perfect.

Finally, you return an HTML table wrapped around the array of `employees` built with mapping.

[source,html]
----
<table>
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Description</th>
    </tr>
    {employees}
</table>
----

This simple layout of state, properties, and HTML shows how React lets you declaritively create a simple and easy-to-understand component.

[[NOTE]]
====
Does this code contain both HTML _and_ JavaScript? Yes, this is https://facebook.github.io/jsx/[JSX]. There is no requirement to use it. React can be written using pure JavaScript, but the JSX syntax is quite terse. Thanks to rapid work on the Babel.js, the transpiler provides both JSX and ES6 support all at once

JSX also includes bits and pieces of http://es6-features.org/#Constants[ES6]. The one used in the code is the http://es6-features.org/#ExpressionBodies[arrow function]. It avoids creating a nested function() with its own scoped *this*, and avoids needing a http://stackoverflow.com/a/962040/28214[*self* variable].

Worried about mixing logic with your structure? React's APIs encourage nice, declarative structure combined with state and properties. Instead of mixing a bunch of unrelated JavaScript and HTML, React encourages building simple components with small bits of related state and properties that work well together. It lets you look at a single component and understand the design. Then they are easy to combine together for bigger structures.
====

Next, you need to actually define what an `<Employee />` is.

.src/main/js/app.js - Employee component
[source,javascript,indent=0]
----
include::src/main/js/app.js[tag=employee]
----

This component is very simple. It has a single HTML table row wrapped around the employee's three properties. The property itself is `this.props.employee`. Notice how passing in a JavaScript object makes it easy to pass along data fetched from the server?

Because this component doesn't manage any state nor does it deal with user input, there is nothing else to do. This might tempt you to cram it into the `<EmployeeList />` up above. Don't do it! Instead, splitting your app up into small components that each do one job will make it easier to build up functionality in the future.

The last step is to render the whole thing.

.src/main/js/app.js - rendering code
[source,javascript,indent=0]
----
include::src/main/js/app.js[tag=render]
----

`React.render()` accepts two arguments: a React component you defined as well as a DOM node to inject it into. Remember how you saw the `<div id="react"></div>` item earlier from the HTML page? This is where it gets picked up and plugged in.

With all this in place, re-run the application (`./mvnw spring-boot:run`) and visit http://localhost:8080.

image::https://github.com/spring-guides/tut-react-and-spring-data-rest/raw/master/basic/images/basic-1.png[]

You can see the initial employee loaded up by the system.

Remember using cURL to create new entries? Do that again.

----
curl -X POST localhost:8080/api/employees -d "{\"firstName\": \"Bilbo\", \"lastName\": \"Baggins\", \"description\": \"burglar\"}" -H "Content-Type:application/json"
----

Refresh the browser, and you should see the new entry:

image::https://github.com/spring-guides/tut-react-and-spring-data-rest/raw/master/basic/images/basic-2.png[]

And now you can see both of them listed on the web site.

## Review

In this section:

* You defined a domain object and a corresponding repository.
* You let Spring Data REST export it with full blown hypermedia controls. 
* You created two simple React components in a parent-child relationship.
* You fetched server data and rendered them in as a simple, static HTML structure.

Issues?

* The web page wasn't dynamic. You had to refresh the browser to fetch new records.
* The web page didn't use any hypermedia controls or metadata. Instead, it was hardcoded to fetch data from `/api/employees`.
* It's read only. While you can alter records using cURL, the web page offers none of that.

These are things we can address in the next section.
