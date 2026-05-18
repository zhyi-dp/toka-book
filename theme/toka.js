hljs.registerLanguage('toka', function(hljs) {
  return {
    name: 'Toka',
    aliases: ['tk'],
    keywords: {
      keyword: 'fn auto shape impl import guard cede new unsafe alloc free null none effects return if else while loop for match in break continue as pub async await',
      type: 'i8 i16 i32 i64 u8 u16 u32 u64 f32 f64 bool char void String Vec Result Option Data Buffer Node Point',
      literal: 'true false null none'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: 's"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        className: 'number',
        variants: [
          { begin: '\\b0x[a-fA-F0-9_]+\\b' },
          { begin: '\\b0o[0-7_]+\\b' },
          { begin: '\\b0b[01_]+\\b' },
          { begin: '\\b\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?\\b' }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginKeywords: 'fn', end: '(\\(|<)', excludeEnd: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: 'class',
        beginKeywords: 'shape impl', end: /\{/, excludeEnd: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        className: 'symbol',
        begin: /#|\?|\^|~|\*|&|!|<-/
      }
    ]
  };
});
