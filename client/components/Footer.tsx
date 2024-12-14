function Footer() {
  return (
    <footer className="mt-8 rounded-t-lg bg-blue-200 p-4 text-center text-blue-900 shadow-md">
      <p className="text-sm">
        Made with ❤️ by <span className="font-bold">You</span>!
      </p>
      <p className="mt-1 text-blue-700">&copy; 2024 | Nikki Cupples</p>
      <ul className="flex flex-row justify-center">
        <li className="p-2 hover:text-[#00BFA6]">
          <a href="https://www.linkedin.com/in/nikkicupples/">Linked In</a>
        </li>
        <li className="p-2 hover:text-[#00BFA6]">
          <a href="https://github.com/nikki-cupples">Github</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
