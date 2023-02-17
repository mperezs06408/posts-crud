/**Pages */
export const DASHBOARD_PAGE = {
    title: 'Datatable',
    subtitle: 'Posts Dashboard',
    ToolsBarLabel: 'Search by Title'
}

export const FORM_PAGE = {
    title: 'Form',
    subtitle: 'Posts Form',
    form_title: 'Create a new post',
    form_edit_title: (idPost) => `Edit #${idPost} post` 
}

/**Components */

export const TABLE_COLUMNS = [
    {
      id:'actions',
      label: 'Actions'
    },
    {
      id: 'Id',
      label: '#',
    },{
      id: 'title',
      label: 'Post Title',
    },{
      id: 'body',
      label: 'Post Body',
    }
  ]

export const COLORS_SCSS = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#03001C',
  secondary: '#89C4E1',
  terciary:'#4B56D2',
  warning: '#EB455F'
}