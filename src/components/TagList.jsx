export default function TagList({ tagCounts, activeTag }) { 	return (
    <div>
    <h3>Tags</h3>
    <style> {`
           .tag-item {
            border-radius: 0.5rem;
            background-color: rgb(var(--gray-light));
            border: 0.5px solid rgb(var(--gray-light));
            font-size: 0.8em;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 60%;
        }
        
        .tag-item a {
            display: block;
            padding: 0.5rem 1rem;
            text-decoration: none;
            color: inherit;
            width: 100%;
        }
        
        .tag-item:hover {
            background-color: rgb(var(--gray));
            color: white;
        }
    
        .tag-item.active {
            font-weight: bold;
            background-color:rgb(119, 126, 202);
            color: white;
            border: 0.5px solid rgb(var(--accent));
        }
    `}

    </style>
    <ul class="tag-list">
        {tagCounts.map(({ name, count }) => (
            <li class={`tag-item ${activeTag === name ? 'active' : ''}`}>
                <a href={`/blog/tag/${name}`}>
                    {name}
                    <span class="tag-count"> ({count})</span>
                </a>
            </li>
        ))}
    </ul>
    </div>
)
}