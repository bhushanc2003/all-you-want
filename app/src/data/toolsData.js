export const TOOLS_LIST = [
  // 5 LIVE ACTIVE FUNCTIONALITIES
  {
    id: 'json-yaml',
    name: 'JSON ⇆ YAML Converter',
    category: 'Converters',
    icon: 'FileJson',
    badge: 'Live Tool',
    description: 'Convert JSON to YAML or YAML to JSON instantly with syntax validation, formatting controls, and 100% privacy.',
    seoDescription: 'Free online JSON to YAML and YAML to JSON converter tool. Validate syntax, format nested configurations, and copy or download clean outputs with zero server uploads.',
    keywords: ['json to yaml', 'yaml to json', 'json formatter', 'yaml validator', 'config converter'],
    isPopular: true,
    status: 'active',
    faq: [
      { q: 'Is my JSON or YAML data stored on any server?', a: 'No. All processing happens entirely within your web browser using JavaScript. Your data never leaves your device.' },
      { q: 'How do I convert YAML back to JSON?', a: 'Simply toggle the direction button or paste your YAML content in the input box. The tool automatically handles bi-directional conversion.' },
      { q: 'What happens if my JSON is invalid?', a: 'The built-in error validator highlights the exact line and character where the syntax error occurs.' }
    ],
    howTo: [
      'Paste your raw JSON or YAML text into the input panel.',
      'Select your desired indentation (2 spaces or 4 spaces).',
      'View the converted output in real-time on the adjacent panel.',
      'Click Copy or Download to save your converted configuration file.'
    ]
  },
  {
    id: 'xml-json',
    name: 'XML ⇆ JSON Converter',
    category: 'Converters',
    icon: 'FileCode2',
    badge: 'Live Tool',
    description: 'Bi-directional XML to JSON converter. Transform complex XML trees into clean JSON objects and vice versa.',
    seoDescription: 'Transform XML data to JSON or JSON to XML online. Fast client-side converter with automatic attribute parsing and formatted structural view.',
    keywords: ['xml to json', 'json to xml', 'convert xml online', 'xml parser', 'soap to json'],
    isPopular: true,
    status: 'active',
    faq: [
      { q: 'How are XML attributes handled when converting to JSON?', a: 'Attributes are converted into JSON properties prefixed with `@_` to preserve full data fidelity.' },
      { q: 'Can I convert large XML payloads?', a: 'Yes! Because conversion runs client-side, execution speed depends on your device CPU and is not capped by server limits.' }
    ],
    howTo: [
      'Paste XML code into the input panel or load our sample XML file.',
      'Watch the JSON structure update automatically in the output preview.',
      'Toggle direction to convert JSON back into valid XML markup.',
      'Copy the output or download it directly as an `.xml` or `.json` file.'
    ]
  },
  {
    id: 'base64',
    name: 'Base64 Encoder & Decoder',
    category: 'Security & Auth',
    icon: 'Binary',
    badge: 'Live Tool',
    description: 'Encode plain text or upload files to Base64 strings. Decode Base64 data instantly with live character statistics.',
    seoDescription: 'Free online Base64 Encoder and Decoder. Encode raw text, strings, images, or documents to Base64 data URLs or decode Base64 safely.',
    keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'url safe base64', 'file to base64'],
    isPopular: true,
    status: 'active',
    faq: [
      { q: 'What is URL-safe Base64 encoding?', a: 'URL-safe Base64 replaces `+` with `-` and `/` with `_` so the encoded string can be used safely in URL query parameters without escaping.' },
      { q: 'Can I convert files to Base64?', a: 'Yes! Upload any file to generate a Data URL or raw Base64 string for immediate embedding in CSS/HTML.' }
    ],
    howTo: [
      'Type or paste your string in the Text input area, or drop a file in the File upload box.',
      'Choose between Standard Base64 or URL-Safe Base64 encoding.',
      'Switch between Encode and Decode modes using the top tabs.',
      'Click Copy Result to copy the encoded/decoded string instantly.'
    ]
  },
  {
    id: 'jwt',
    name: 'JWT Debugger & Visualizer',
    category: 'Security & Auth',
    icon: 'KeyRound',
    badge: 'Live Tool',
    description: 'Decode and inspect JSON Web Tokens. Color-code Headers, Payloads, Signatures, and auto-parse expiration timestamps.',
    seoDescription: 'Online JWT Token Decoder and Debugger. Inspect JWT payload claims, verify token validity, and convert Unix exp/iat timestamps into human-readable local dates.',
    keywords: ['jwt decoder', 'jwt debugger', 'decode jwt online', 'json web token inspector', 'jwt timestamp parser'],
    isPopular: true,
    status: 'active',
    faq: [
      { q: 'Is it safe to paste production JWT tokens here?', a: 'Yes! All parsing happens 100% in your local browser runtime. Tokens are never transmitted across the network or logged anywhere.' },
      { q: 'Does this tool verify the JWT signature?', a: 'This frontend tool visualizes the signature algorithm and claims. Signature cryptographic verification requires your secret key, which is kept private on your backend server.' }
    ],
    howTo: [
      'Paste your raw JWT string (e.g. `eyJhbGciOi...`) into the JWT input field.',
      'Inspect the color-coded decoded panels for Header, Payload, and Signature.',
      'Check the expiration timer and timestamp badges for live token status.'
    ]
  },
  {
    id: 'glassmorphism',
    name: 'CSS Glassmorphism & Gradient Generator',
    category: 'UI & Design',
    icon: 'Sparkles',
    badge: 'Live Tool',
    description: 'Visual UI builder for frosted glass effects & modern multi-color mesh gradients. Live preview box & instant CSS copy.',
    seoDescription: 'Free visual CSS Glassmorphism & Gradient Generator. Tweak backdrop blur, opacity, border radiance, and shadow depth in real-time and copy production-ready CSS snippet.',
    keywords: ['glassmorphism generator', 'css backdrop blur', 'frosted glass css', 'gradient generator', 'ui css generator'],
    isPopular: true,
    status: 'active',
    faq: [
      { q: 'Which browsers support CSS glassmorphism?', a: 'Modern browsers including Chrome, Safari, Firefox, and Edge support `backdrop-filter: blur()`. Webkit prefixes are automatically included in our generated CSS snippet.' },
      { q: 'How do I use the generated CSS in my project?', a: 'Click the Copy CSS button and paste the rule directly into your CSS stylesheet or inline style attribute.' }
    ],
    howTo: [
      'Adjust the sliders for Blur, Opacity, Border Radius, and Shadow.',
      'Customize the background color or gradient to test transparency against vibrant backdrops.',
      'View the real-time frosted glass card preview on the canvas.',
      'Click Copy CSS Code to get your ready-to-use CSS snippet.'
    ]
  },

  // HIGH SEO CATALOGUE (PDF & DOCUMENT TOOLS)
  {
    id: 'pdf-to-word',
    name: 'PDF to Word Converter',
    category: 'PDF & Documents',
    icon: 'FileText',
    badge: 'Popular Tool',
    description: 'Convert PDF documents into editable Microsoft Word (.docx) files online for free.',
    seoDescription: 'Free online PDF to Word Converter. Extract editable text and layout from PDF files directly in browser with high fidelity.',
    keywords: ['pdf to word', 'convert pdf to word', 'pdf to docx', 'online pdf converter', 'free pdf tool'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF Converter',
    category: 'PDF & Documents',
    icon: 'FileText',
    badge: 'Popular Tool',
    description: 'Convert DOCX and DOC documents into clean PDF files ready for printing and sharing.',
    seoDescription: 'Convert Word document to PDF online for free. Fast client-side PDF renderer with exact typography preservation.',
    keywords: ['word to pdf', 'convert docx to pdf', 'doc to pdf online'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'pdf-merge-split',
    name: 'Merge & Split PDF Files',
    category: 'PDF & Documents',
    icon: 'Layers',
    badge: 'Popular Tool',
    description: 'Combine multiple PDF files into a single document or split pages into separate files.',
    seoDescription: 'Free online PDF Merger and Splitter. Reorder pages, join PDF files, or extract specific pages securely.',
    keywords: ['merge pdf', 'split pdf', 'combine pdf online', 'pdf page extractor'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'pdf-compressor',
    name: 'PDF File Compressor',
    category: 'PDF & Documents',
    icon: 'Archive',
    badge: 'Popular Tool',
    description: 'Reduce PDF file size without sacrificing document quality or clarity.',
    seoDescription: 'Compress PDF file size online for free. Shrink large PDF documents for email attachments and web upload.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf file'],
    isPopular: true,
    status: 'upcoming'
  },

  // HIGH SEO CATALOGUE (IMAGE & MEDIA TOOLS)
  {
    id: 'webp-to-png',
    name: 'WebP to PNG / JPG Converter',
    category: 'Image & Media',
    icon: 'Image',
    badge: 'Popular Tool',
    description: 'Convert WebP images to PNG or JPG formats instantly with transparency support.',
    seoDescription: 'Free online WebP image converter. Transform Google WebP files into standard PNG or JPEG images in 1 click.',
    keywords: ['webp to png', 'webp to jpg', 'convert webp online', 'image converter'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor & Resizer',
    category: 'Image & Media',
    icon: 'Maximize2',
    badge: 'Popular Tool',
    description: 'Compress PNG, JPG, and WebP images up to 80% with zero visual quality loss.',
    seoDescription: 'Online image compressor and resizer tool. Optimize website images for faster page load times and better SEO.',
    keywords: ['compress image', 'png compressor', 'jpeg optimizer', 'resize image online'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'svg-optimizer',
    name: 'SVG Code Cleaner & Optimizer',
    category: 'Image & Media',
    icon: 'Code',
    badge: 'Popular Tool',
    description: 'Minify SVG markup, remove unnecessary metadata tags, and compress SVG vector art.',
    seoDescription: 'Free SVG optimizer tool. Clean up inline SVG code for web developers and UI designers.',
    keywords: ['svg optimizer', 'minify svg', 'clean svg code', 'svg editor online'],
    isPopular: false,
    status: 'upcoming'
  },

  // HIGH SEO CATALOGUE (SECURITY & DEV UTILITIES)
  {
    id: 'hash-generator',
    name: 'Crypto & Hash Generator (SHA256 / MD5)',
    category: 'Security & Auth',
    icon: 'ShieldCheck',
    badge: 'Popular Tool',
    description: 'Generate cryptographic MD5, SHA-1, SHA-256, and SHA-512 hashes instantly from string input.',
    seoDescription: 'Free online SHA256 and MD5 Hash Generator. Calculate cryptographic checksums and hashes securely.',
    keywords: ['sha256 generator', 'md5 hash online', 'sha512 calculator', 'hash checksum'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator with Custom Styles',
    category: 'Security & Auth',
    icon: 'QrCode',
    badge: 'Popular Tool',
    description: 'Create customizable QR codes for URLs, WiFi networks, vCards, and plain text.',
    seoDescription: 'Free online QR Code Generator. Download high-resolution PNG or SVG QR codes with logo support.',
    keywords: ['qr code generator', 'make qr code free', 'custom qr code maker'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'password-generator',
    name: 'Secure Password Generator',
    category: 'Security & Auth',
    icon: 'Lock',
    badge: 'Popular Tool',
    description: 'Generate strong, random, cryptographically secure passwords with custom length and symbols.',
    seoDescription: 'Online password generator tool. Create unhackable passwords with entropy scores and copy to clipboard.',
    keywords: ['password generator', 'strong password maker', 'random string generator'],
    isPopular: false,
    status: 'upcoming'
  },

  // HIGH SEO CATALOGUE (DEVELOPER & CONVERTER TOOLS)
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    category: 'Converters',
    icon: 'Database',
    badge: 'Popular Tool',
    description: 'Transform CSV spreadsheets or Excel exports into clean JSON arrays of objects.',
    seoDescription: 'Free online CSV to JSON converter. Parse tabular CSV data into structured JSON objects with custom delimiters.',
    keywords: ['csv to json', 'excel to json', 'convert csv online', 'tabular data parser'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'markdown-html',
    name: 'Markdown to HTML Converter',
    category: 'Developer Tools',
    icon: 'FileText',
    badge: 'Popular Tool',
    description: 'Convert Markdown formatted text into clean HTML code with live side-by-side preview.',
    seoDescription: 'Online Markdown to HTML editor and previewer. Write GFM markdown and export styled HTML markup.',
    keywords: ['markdown to html', 'md to html', 'markdown previewer online', 'gfm converter'],
    isPopular: false,
    status: 'upcoming'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester & Pattern Matcher',
    category: 'Developer Tools',
    icon: 'Regex',
    badge: 'Popular Tool',
    description: 'Test regular expressions in real-time with regex match highlighting and syntax cheat sheet.',
    seoDescription: 'Online Regex tester and debugger. Validate regex patterns, test match groups, and inspect string capture.',
    keywords: ['regex tester', 'regex online matcher', 'regular expression debugger'],
    isPopular: true,
    status: 'upcoming'
  },

  // HIGH SEO CATALOGUE (UI & DESIGN TOOLS)
  {
    id: 'css-box-shadow',
    name: 'CSS Box Shadow & Layer Generator',
    category: 'UI & Design',
    icon: 'Square',
    badge: 'Popular Tool',
    description: 'Design multi-layered smooth box shadows for modern UI components and copy CSS code.',
    seoDescription: 'Free online CSS Box Shadow Generator. Create soft, layered box shadows for cards, buttons, and panels.',
    keywords: ['css box shadow generator', 'css shadow builder', 'ui shadow generator'],
    isPopular: true,
    status: 'upcoming'
  },
  {
    id: 'tailwind-palette',
    name: 'Tailwind CSS Color Palette Picker',
    category: 'UI & Design',
    icon: 'Palette',
    badge: 'Popular Tool',
    description: 'Explore curated Tailwind CSS color palettes, generate HSL/HEX shades, and copy classnames.',
    seoDescription: 'Tailwind CSS color generator and palette browser. Copy Tailwind color classes and hex values instantly.',
    keywords: ['tailwind colors', 'tailwind palette generator', 'css color picker'],
    isPopular: false,
    status: 'upcoming'
  }
];

export const CATEGORIES = [
  'All',
  'Converters',
  'Security & Auth',
  'UI & Design',
  'PDF & Documents',
  'Image & Media',
  'Developer Tools'
];
