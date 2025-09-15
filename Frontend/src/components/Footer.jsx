export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 text-center mt-12 border-t border-gray-800">
      <p>© {new Date().getFullYear()} Impact Connect. All rights reserved.</p>
      <div className="flex justify-center space-x-6 mt-4 text-cyan-400 text-xl">
        <a href="#">🌐</a>
        <a href="#">🐦</a>
        <a href="#">📘</a>
        <a href="#">📸</a>
      </div>
    </footer>
  );
}
