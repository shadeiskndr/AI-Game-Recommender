function Footer() {
  return (
    <footer className="relative z-10 mt-16 py-8 border-t border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-400">
            <span className="text-gray-400 font-medium">Developed by</span>
            <a
              href="https://github.com/shadeiskndr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-dark-800/50 rounded-full hover:bg-primary-600/20 hover:text-primary-300 transition-all duration-200 border border-dark-700 hover:border-primary-500/50"
            >
              Shahathir Iskandar
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AI Game Recommender. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
