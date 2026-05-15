export default function ProjectContent({ section }) {
  return (
    <div className="proj-detail-card__body">
      {section.paragraphs?.map((text) => (
        <p key={text.slice(0, 40)}>{text}</p>
      ))}
      {section.links?.map((link) => (
        <p key={`${link.label}-${link.href}`} className="proj-detail-card__link-line">
          {link.before}
          <a
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
          {link.after}
        </p>
      ))}
      {section.externalLink && (
        <a
          className="proj-detail-card__ext"
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
