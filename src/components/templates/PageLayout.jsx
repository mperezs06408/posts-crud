function PageLayout({title, children}){
    return(
        <main className="main">
            <h1>{title}</h1>
            <section className="main__content">
                {children}
            </section>
        </main>
    )
}

export default PageLayout;