# Posts Manager CRUD

Posts manager CRUD app developed with ReactJS, ViteJS and MaterialUI & Sass.

This app consume a [JSON-PlaceHolder](https://jsonplaceholder.typicode.com/) API to emulate a production environment which implements a real back-end to manage each post created with the CRUD.

## Installation

You should to get installed **npm** package manager to run this app in developer environment.

Therefore, after installed npm you should to download all dependencies of the code:
```bash
npm install
```
Then, you could deploy Post Manager CRUD in a ViteJS DEV environment using the next bash code:
```bash
npm run dev
```
App will run over 8080 port in [LocalHost](http://localhost:8080/)

### Public use

To test Post Manager CRUD online please check this [link](https://posts-crud-beta.vercel.app/)

Posts Manager CRUD was deployed on Vercel.

### Use of Posts CRUD

1. Open the vecel's link or clone this repo in your localhost and run dev environment

2. In the main page (Datatable) you can manage your posts click in the buttons located in the first column (Edit post and Delete Post)

3. To create new post you should click on the plus button aside the search bar

4. To create new post all form fields (Title and Body) are required. Then if some input is empty, the form will deny your action and an error message will be shown with their respective problem

4. To edit a created post previously, you should to click on pencil icon (Actions column) and the crud will open an edit form. This form has the same validation as when we are creating a new post

5. To delete a post you should to click on trash icon (Actions column) and the crud will open a modal to confirm your action. Delete a post is an irreversible action

6. If you click on Continue button in delete post modal, the page will show an Alert over the table to inform you that delete action was completed successfully

## Visuals

A brief review of Post Manager CRUD:

### Mobile view

- [Table](./public/mobile_dataTable.png) 

- [Pagination](./public/mobile_pagination.png)

- [Delete Post Modal](./public/mobile_deleteModal.png)

- [Success Delete Post Message](./public/modal_deletedPostMsg.png)

- [Form](./public/mobile_form.png)

- [Form with Post Created Message](./public/mobile_formPostCreated.png)

## Desktop view

- [Table with Sort by ID Active](./public/desktop_dataTableSortable.png)

- [Table with Filter by ID Active](./public/desktop_DatatableFilter.png)

- [Form](./public/desktop_form.png)

## Roadmap

For future releases this app will implement a custom host to store the post that users create.

Also, It is important to develop a user authentication to personalizate the user experience over this app.

## Authors and knowledge

To see more about my projects check my personal GitHub profile: [@mperezs06408](https://github.com/mperezs06408)

## License

[MIT](https://choosealicense.com/licenses/mit/)