import { TennisGame } from './TennisGame';

export class TennisGame5 implements TennisGame {
  private player1: Player;
  private player2: Player;
  private readonly scores: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
  private scoreHandler: ScoreHandler;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);

    const winHandler = new WinHandler();
    const advantageHandler = new AdvantageHandler();
    const deuceHandler = new DeuceHandler();
    const defaultHandler = new DefaultHandler();
    winHandler.setNextHandler(advantageHandler);
    advantageHandler.setNextHandler(deuceHandler);
    deuceHandler.setNextHandler(defaultHandler);
    this.scoreHandler = winHandler;
  }

  getScore(): string {
    const result = this.scoreHandler.handle(this.player1, this.player2);
    if (result) {
      return result;
    }
    throw new Error("No handler found");
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.name)
      this.player1.winPoint();
    else if (playerName === this.player2.name)
      this.player2.winPoint();
  }
}

class Player {
  readonly name: string;
  score: number;
  constructor(name: string) {
    this.name = name;
    this.score = 0;
  }
  getScore(): number {
    return this.score;
  }
  winPoint() {
    this.score += 1;
  }
}

abstract class ScoreHandler {
  nextHandler: ScoreHandler | null = null;

  setNextHandler(handler: ScoreHandler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(player1: Player, player2: Player): string | null {
    const result = this.process(player1, player2);
    if (result) {
      return result;
    }

    if (this.nextHandler) {
      return this.nextHandler.handle(player1, player2);
    }

    return null;
  }

  protected abstract process(player1: Player, player2: Player): string | null;
}

class DeuceHandler extends ScoreHandler{
  protected process(player1: Player, player2: Player): string | null {
    if ((player1.getScore() === player2.getScore()) && player1.getScore() >= 3) {
      return "Deuce";
    }
    return null;
  }
}

class AdvantageHandler extends ScoreHandler {
  protected process(player1: Player, player2: Player): string | null {
    const diffScore = Math.abs(player1.getScore() - player2.getScore());
    if ((player1.getScore() >= 4 || player2.getScore() >= 4) && diffScore === 1) {
      return `Advantage ${player1.getScore() > player2.getScore() ? player1.name : player2.name}`;
    }
    return null;
  }
}

class WinHandler extends ScoreHandler {
  protected process(player1: Player, player2: Player): string | null {
    const diffScore = Math.abs(player1.getScore() - player2.getScore());
    if (diffScore >= 2 && (player1.getScore() >= 4 || player2.getScore() >= 4)) {
      return `Win for ${player1.getScore() > player2.getScore() ? player1.name : player2.name}`;
    }
    return null;
  }
}

class DefaultHandler extends ScoreHandler {
  private readonly scores: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
  protected process(player1: Player, player2: Player): string | null {
    if (player1.getScore() < 4 && player2.getScore() < 4) {
      if (player1.getScore() === player2.getScore()) {
        return `${this.scores[player1.getScore()]}-All`;
      }
      return `${this.scores[player1.getScore()]}-${this.scores[player2.getScore()]}`;
    }
    return null;
  }
}
