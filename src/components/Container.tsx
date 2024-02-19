import { useRouter } from 'next/router';

export default function Container({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { s } = router.query

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">Seeds</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0"></ul>
            <form className="d-flex" action=''>
                <div className="input-group">
                    <input type="text" name="s" className="form-control" placeholder="Søk" aria-label="Søk" defaultValue={s || ''} />
                    <button className="btn btn-primary" id="search">Search</button>
                </div>
            </form>
          </div>
        </div>
      </nav>

      <div className="container theme-showcase" role="main">{children}</div>
    </>
  )
}
