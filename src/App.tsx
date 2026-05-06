import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Paper } from './components/Paper'
import { TokenCalculator } from './components/TokenCalculator'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CommandPalette } from './components/CommandPalette'
import { useCommandPalette } from './hooks/useCommandPalette'

export default function App() {
  const { isOpen, open, close } = useCommandPalette()

  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />

      <Nav onOpenPalette={open} />

      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Paper />
        <TokenCalculator />
        <Contact />
      </main>

      <Footer />

      <CommandPalette isOpen={isOpen} onClose={close} />
    </>
  )
}
