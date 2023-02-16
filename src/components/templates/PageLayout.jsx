import '@styles/components/PageLayout.scss'

function PageLayout({title, subtitle, children}){
    return(
        <main className="main">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <section className="main__content">
                {children}
            </section>
        </main>
    )
}

export default PageLayout;