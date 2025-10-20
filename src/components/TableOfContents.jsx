import { useState, useEffect } from 'preact/hooks';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
   
    const elements = Array.from(
      document.querySelectorAll('article h2, article h3')
    );

    const headingData = elements.map((element) => {
      let id = element.id;
      if (!id) {
        id = element.textContent
          ?.trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]/g, '');
        element.id = id;
      }

      return {
        id,
        text: element.textContent || '',
        level: element.tagName.toLowerCase(),
      };
    });

    setHeadings(headingData);


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 1,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

   
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc" aria-label="Index">
      <h2 className="toc-title">Index</h2>
      <button id = "back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-item ${heading.level}`}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`toc-link ${activeId === heading.id ? 'active' : ''}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        .toc {
          position: sticky;
          top: 2rem;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .toc-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: #212529;
        }

        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toc-item {
          margin: 0;
          line-height: 1.6;
        }

        .toc-item.h2 {
          margin-top: 0.5rem;
        }

        .toc-item.h3 {
          padding-left: 1rem;
          font-size: 0.9rem;
        }

        .toc-link {
          display: block;
          padding: 0.25rem 0.5rem;
          color: #6c757d;
          text-decoration: none;
          border-left: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .toc-link:hover {
          color: #212529;
          background: #e9ecef;
          border-left-color: #dee2e6;
        }

        .toc-link.active {
          color: #0d6efd;
          background: #e7f1ff;
          border-left-color: #0d6efd;
          font-weight: 500;
        }

        .toc::-webkit-scrollbar {
          width: 6px;
        }

        .toc::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .toc::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .toc::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        @media (max-width: 1024px) {
          .toc {
            display: none;
          }
        }

        #back-to-top {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: rgb(var(--gray-light));
          border: 1px solid rgb(var(--gray-light));
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 0.8em;
          font-weight: 500;
          color: rgb(var(--gray-dark));
        }

        #back-to-top:hover {
          background-color: rgb(var(--gray));

          color: white;
        }

        #back-to-top:active {
          transform: translateY(1px);
        }
          
      `}</style>
    </nav>
  );
}