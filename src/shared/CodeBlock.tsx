import { Box, Flex } from "@radix-ui/themes";

function highlight(line: string) {

    let html = line.replace(/</g, "&lt;").replace(/>/g, "&gt;");


    // keywords
    // html = html.replace(/\b(const|let|return|function|if|else)\b/g,
    //     `<span style="color: var(--accent-9)">$1</span>`);

    // strings
    html = html.replace(/(".*?"|'.*?')/g,
        `<span style="color: var(--green-9)">$1</span>`);

    // JSX tags
    html = html.replace(/(&lt;\/?[A-Za-z0-9]+.*?&gt;)/g,
        `<span style="color: var(--blue-9)">$1</span>`);

    // comments
    html = html.replace(/(\/\/.*$)/g,
        `<span style="color: var(--gray-9)">$1</span>`);

    return html;
}

export function CodeBlock({ code }: { code: string }) {
    const lines = code.split("\n");




    return (
        <Box maxHeight='420px' overflowY="scroll" mb="4">
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {lines.map((line, i) => (
                    <Flex>
                        <Box width="12">{(i+1) + "  "}</Box>
                        <div key={i} dangerouslySetInnerHTML={{ __html: highlight(line) }} />
                    </Flex>
                ))}
            </pre>
        </Box>
    );
}
