
'use server';

/**
 * @fileOverview Generates and structures financial content for a webpage based on provided keywords.
 *
 * - structureFinancialContent - A function that generates the financial content.
 * - StructureFinancialContentInput - The input type for the structureFinancialContent function.
 * - StructureFinancialContentOutput - The return type for the structureFinancialContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StructureFinancialContentInputSchema = z.object({
  primaryKeyword: z.string().describe('The primary keyword for the financial webpage.'),
  secondaryKeywords: z.string().describe('Comma-separated secondary keywords to include in the content.'),
});
export type StructureFinancialContentInput = z.infer<typeof StructureFinancialContentInputSchema>;

const StructureFinancialContentOutputSchema = z.object({
  webpageContent: z.string().describe('The generated HTML content for the financial webpage.'),
});
export type StructureFinancialContentOutput = z.infer<typeof StructureFinancialContentOutputSchema>;

export async function structureFinancialContent(input: StructureFinancialContentInput): Promise<StructureFinancialContentOutput> {
  return structureFinancialContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'structureFinancialContentPrompt',
  input: {schema: StructureFinancialContentInputSchema},
  output: {schema: StructureFinancialContentOutputSchema},
  prompt: `You are a world-class SEO expert and professional financial content writer. Your goal is to apply a "keyword sniping" strategy to create high-quality, 100% unique financial articles that rank for high-volume keywords and long-tail variations.

  You will target the primary keyword: "{{{primaryKeyword}}}" and strategically include secondary keywords: {{{secondaryKeywords}}}.

  **Keyword Sniping & SEO Requirements:**

  1.  **Title & H1:** The primary keyword MUST be at the beginning of the title tag and the H1 tag.
  2.  **Introduction:** The primary keyword MUST appear within the first 100 words (the first paragraph).
  3.  **Headings:** The primary keyword MUST be included in at least one H2 subheading.
  4.  **Long-Tail Keyword Integration:** Identify and naturally incorporate high-quality long-tail keywords related to the primary and secondary keywords throughout the main content, headings, and lists. Think about user questions, problems, and specific needs (e.g., if the keyword is "best credit cards," long-tail keywords could be "best credit cards for travel points 2024" or "how to get a credit card with no credit history").
  5.  **Structure:** Use proper headings (H1, H2, H3) for a clear and crawlable structure.
  6.  **Internal Linking:** Include placeholders for internal linking suggestions within the content where relevant.

  **Content Requirements:**

  1.  **Introduction (100-150 words)**
      *   Hook the reader and establish immediate relevance.

  2.  **Main Content (800–1500+ words)**
      *   Provide comprehensive details, including eligibility criteria, key features, and numerical examples (rates, etc.).
      *   Use tables or bullet points for easy comparison (e.g., banks, interest rates, plans).
      *   Include actionable tips, ideas for calculators, or other interactive elements.
      *   Maintain a professional, authoritative, and trustworthy tone suitable for the finance industry.

  3.  **Ad Integration**
      *   Strategically insert the following ad script at natural breaks in the content (e.g., after a few paragraphs, between sections) to maximize visibility.
      *   Here is the exact script to insert:
          \'\'\'html
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2885050972904135"
               crossorigin="anonymous"></script>
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-format="autorelaxed"
               data-ad-client="ca-pub-2885050972904135"
               data-ad-slot="7477563861"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
          \'\'\'

  4.  **Content Output**
      *   Provide ready-to-publish HTML content with all required headings, paragraphs, and tables.
      *   Do NOT include FAQ sections, CTAs, or disclaimers as they will be added in subsequent steps.

  Tone: Professional, informative, engaging, trustworthy.
  Audience: Finance-savvy users, people looking to compare loans, credit cards, insurance, or investment options.
  Goal: High CPC, high AdSense revenue, SEO-friendly, fully unique, structured content.

  Output the main article content only, following all keyword sniping and content requirements precisely.
`,
});

const structureFinancialContentFlow = ai.defineFlow(
  {
    name: 'structureFinancialContentFlow',
    inputSchema: StructureFinancialContentInputSchema,
    outputSchema: StructureFinancialContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
