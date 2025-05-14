
export default function ArticleCard({ article, onClick }) {
  return (
     <div  onClick={onClick} className="bg-white dark:bg-gray-800 w-96 rounded-3xl shadow-lg overflow-hidden" style={{
        backgroundImage: `url(${article.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-nature-light dark:bg-nature-dark bg-cover object-cover bg-center h-56 w-full" />
      <div className="px-4 py-0.5 text-left h-fit bg-gradient-to-t from-[#02020298]  from-70% to-[#00000000]">
        <h3 className="text-xl text-white dark:text-dark font-semibold">
        {article.title}
        </h3>
        <p className="mt-2 mb-10 dark:text-gray-600 text-gray-300">
         {article.description}
        </p>
      
      </div>
    </div>
    
  );
}
