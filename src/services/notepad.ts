import type { Echoer } from "../types/echoer";

class NotepadService {
  private echoers: Map<string, Echoer> = new Map();

  getEchoer(id: string): Echoer | undefined {
    return this.echoers.get(id)
  }

  getEchoerName(id: string): string | undefined | null {
    const echoer: Echoer | undefined = this.echoers.get(id)

    if (echoer) {
      return echoer.name
    }
  }

  addEchoer(echoer: Echoer): void {
    this.echoers.set(echoer.id, echoer)
  }

  removeEchoer(id: string): void {
    this.echoers.delete(id)
  }
}

export const notepadService = new NotepadService()
