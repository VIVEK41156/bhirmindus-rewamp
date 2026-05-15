export default function ProjectSectionContent({ section, sectionIndex, title }) {
  const isTitleBlock = section.paragraphs?.length === 1 && section.paragraphs[0] === title;

  return (
    <div className="project-card__body">
      {section.paragraphs?.map((text, i) =>
        isTitleBlock && i === 0 ? (
          <p key={i} className="project-card__lead-title">
            {text}
          </p>
        ) : (
          <p key={i}>{text}</p>
        )
      )}

      {section.links?.map((link, i) => (
        <p key={`link-${i}`} className="project-card__links">
          {link.before}
          <a href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
            {link.label}
          </a>
          {link.after}
        </p>
      ))}

      {section.externalLink && (
        <a
          className="project-card__external"
          href={section.externalLink.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {section.externalLink.label}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
