import AddTodo from './AddTodo'
import Footer from './Footer'
import Header from './Header'
import HelpButton from './HelpButton'
import TodoList from './TodoList'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-100">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center">
        <section className="w-full max-w-md">
          <AddTodo />
          <TodoList />
          <HelpButton />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
