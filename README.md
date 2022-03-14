# VolkswagenGroup
This project simulate a management application for the cars of the Volkswagen Group.

## Home / Dashboard
On this screen you could select the car's brand that you want consult.

![image](https://user-images.githubusercontent.com/6065194/158072140-d1b4b2e0-dd87-4b0e-a2e6-19a8c1077941.png) ![image](https://user-images.githubusercontent.com/6065194/158072412-b2bd7f96-50cf-43f3-9746-ed879fa6322a.png)

### Toolbar

In the toolbar you could click in:
* The logo of Volkswagen to return the Home / Dashboard ![image](https://user-images.githubusercontent.com/6065194/158072240-b7c34086-8c25-41c6-8637-9e3629802129.png)
* The logo of `Setting` and bring up a menu with two options: 
  * Dark / Light mode: Change the color style of the applicacion.
  * Languages: that Change the language of the application.
 
![image](https://user-images.githubusercontent.com/6065194/158072349-61e44313-0a76-455c-9e8e-4796d976ab43.png)

## Car
On this screen, that have infinite scroll, you could see the cars filtered by the selected brand. We could do:

![image](https://user-images.githubusercontent.com/6065194/158072554-b323fae8-2808-4f13-9e47-474c1b0bf6af.png)

### Filter
![image](https://user-images.githubusercontent.com/6065194/158072896-8a37eaef-fd27-4457-a968-d2643b32f7f8.png)

* You could search and sort by 'model', 'description', 'price', 'power', 'fuel'.
* You could change the selected brand for see other cars. ![image](https://user-images.githubusercontent.com/6065194/158072829-b936ebf5-078b-411c-b59f-a81e7d200e7d.png)

### Add cars
![image](https://user-images.githubusercontent.com/6065194/158072910-2a7f9f12-6b28-493b-897f-7c102179d3c6.png)

You could add new cars. All fields in the form are required, if you leave any field empty you couldn't save the new car.

![image](https://user-images.githubusercontent.com/6065194/158073389-68e1150b-5176-4c3c-95ff-e016c4402676.png)

### Menu card
On the card, you could click the three dots button and bring up a menu with three options:

![image](https://user-images.githubusercontent.com/6065194/158073351-bb5e82ff-9a2c-4555-b257-d920051426b9.png)

* `Show`: You could see all information of the select car. You couldn't edit this information since this option.

![image](https://user-images.githubusercontent.com/6065194/158073437-4102ed58-4173-4f40-bf01-c12119a69236.png)

* `Edit`: You could see and update all information of the select car.

![image](https://user-images.githubusercontent.com/6065194/158073481-631b7ba0-72e6-468e-829c-173594b29419.png)


* `Delete`: You could delete the select car.

![image](https://user-images.githubusercontent.com/6065194/158073511-5908233b-de93-4928-b72a-a34861a00392.png)

## Responsive
### iPad Air (Light mode)
![image](https://user-images.githubusercontent.com/6065194/158078479-15d5783f-2643-45ce-84f4-bcadcbd1a83e.png)
![image](https://user-images.githubusercontent.com/6065194/158078498-e1cc8d77-c001-4eaa-ad7d-43320c4aa03a.png)

![image](https://user-images.githubusercontent.com/6065194/158078512-b01f9a1b-2d9b-464a-9448-c9c2446d1819.png) 
![image](https://user-images.githubusercontent.com/6065194/158078529-8adcc565-0b75-4878-bead-ff62de414151.png)
### Samsung Galaxy S8 (Dark mode)
![image](https://user-images.githubusercontent.com/6065194/158078578-9ae953d4-1420-47c0-b971-fd1d14f505f5.png) ![image](https://user-images.githubusercontent.com/6065194/158078600-d3b51196-ef9e-4258-93e2-c47af688a243.png)
![image](https://user-images.githubusercontent.com/6065194/158078625-9bbe333f-d892-41fb-9203-e3f8ca43a794.png) ![image](https://user-images.githubusercontent.com/6065194/158078656-87370621-f6c0-4bda-a799-deffe7c6049f.png)





# Important things

## External libraries used

* [NgRx](https://ngrx.io) to manage the application state, based on the Redux pattern.
* [lodash](https://lodash.com) to working with arrays, numbers, objects, strings, etc.
* [ngx-infinite-scroll](https://github.com/orizens/ngx-infinite-scroll) to create infinite scroll.

## UI component libraries used
* [Material](https://material.angular.io) to create UI component infrastructure and Material Design components for mobile and desktop Angular web applications.
* [Bootstrap utility classes](https://getbootstrap.com/docs/5.1/utilities) to showing, hiding, aligning, and spacing content.
* [Animate.css](https://animate.style) to create animations.

## Unit and Integration testing results

* FooterComponent (HTML test)
* CarService
* FormCarComponent
* FilterComponent

![image](https://user-images.githubusercontent.com/6065194/158077399-b3cd0ed1-1eaf-446f-9fe0-c92b7d385eff.png)


# Running application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Running json-server

Run `json-server --watch db.json --id` or `npm run json:server` to star your own mocked API [json-server](https://github.com/typicode/json-server).

After that, if you go to http://localhost:3000/cars, you'll get.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
