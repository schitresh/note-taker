import { QueryProvider } from './providers/queryProvider';
import Notes from './components/Notes';

function App() {
  return (
    <QueryProvider>
      <Notes />
    </QueryProvider>
  )
}

export default App
