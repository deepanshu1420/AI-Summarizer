import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');
  const [summaryCopied, setSummaryCopied] = useState(false);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSummaryCopy = () => {
  navigator.clipboard.writeText(formatSummary(article.summary));

  setSummaryCopied(true);

  setTimeout(() => {
    setSummaryCopied(false);
  }, 3000);
};

  const handleClear = () => {
    const currentArticlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    );

    if (currentArticlesFromLocalStorage) {
      setAllArticles([]);
      localStorage.removeItem('articles');
    }
  };

  const formatSummary = (text) => {
  if (!text) return '';
  
  return text
    // Remove Wikipedia citations like [21], [39][40]
    .replace(/\[\d+(?:\]\[\d+)*\]/g, '')

    // Add missing space after periods
    .replace(/\.([A-Z])/g, '. $1')

    // Add missing space between lowercase and uppercase
    .replace(/([a-z])([A-Z])/g, '$1 $2')

    // Collapse multiple spaces into one
    .replace(/\s{2,}/g, ' ')

    .trim();
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Enter a URL'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className='url_input peer'
          />

          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            ↵
          </button>
        </form>

        {/* Browse URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto scrollbar-none'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt='copy item'
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-purple-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
        {allArticles.length > 0 && (
          <div className='flex justify-end'>
            <button
              onClick={handleClear}
              type='button'
              className='light_mode px-2 border border-gray-200 rounded-md text-gray-200 hover:opacity-80 text-sm'
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-32 h-32 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-white text-center light_mode'>
            Well, that wasn&apos;t supposed to happen <br />{' '}
            <span className='font-satoshi font-normal text-gray-300'>
              {error?.data?.message || error?.data?.error || 'Something went wrong'}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <div className='flex items-center justify-between'>
                <h2 className='font-satoshi font-bold text-gray-50 text-xl light_mode'>
                  Article <span className='purple_gradient'>Summary</span>
                  </h2>
                  <img
                  src={summaryCopied ? tick : copy}
                  alt='copy summary'
                  className='w-6 h-5 cursor-pointer brightness-0 invert font-bold'
                  onClick={handleSummaryCopy}
                  />
              </div>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-300 whitespace-pre-line light_mode'>
                  {formatSummary(article.summary)}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
