'use client';

type HtmlSnippetProps = {
    html: string;
    maxLength: number;
}

export const HtmlSnippet = ({ html, maxLength = 150 }: HtmlSnippetProps) => {
    const getSnippet = (html: string, maxLength: number) => {
        if (!html) return "";
        const div = document.createElement("div");
        div.innerHTML = html;
        const text = div.textContent || div.innerText || "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const snippet = getSnippet(html, maxLength);

    return <p className="text-gray-700">{snippet}</p>;
}