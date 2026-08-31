export default function PageHero({ title, subtitle, kicker }) {
  return (
    <section className="sc-page-hero">
      <div className="sc-container">
        {kicker ? <p className="sc-kicker">{kicker}</p> : null}
        <h1 className="sc-page-hero-title mt-3">{title}</h1>
        {subtitle ? <p className="sc-page-hero-desc">{subtitle}</p> : null}
      </div>
    </section>
  );
}
