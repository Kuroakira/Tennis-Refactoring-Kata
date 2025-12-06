import { TennisGame } from './TennisGame';

enum GameStatus {
  EVEN = 'even',
  ADVANTAGE = 'advantage',
  WIN = 'win',
  REGULAR = 'regular',
}

abstract class GameStatusBase {
  player1Score: number = 0;
  player2Score: number = 0;
  player1Name: string;
  player2Name: string;
  protected static readonly scoreMap: Map<number, string> = new Map([
    [0, 'Love'],
    [1, 'Fifteen'],
    [2, 'Thirty'],
    [3, 'Forty'],
  ]);

  constructor(player1Score: number, player2Score: number, player1Name: string, player2Name: string) {
    this.player1Score = player1Score;
    this.player2Score = player2Score;
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  abstract getScore(): string;

  protected getScoreString(score: number): string {
    return GameStatusBase.scoreMap.get(score) || '';
  }
}

class Even extends GameStatusBase {
  getScore(): string {
    if (this.player1Score >= 3) {
      return 'Deuce';
    }
    return `${this.getScoreString(this.player1Score)}-All`;
  }
}

class Advantage extends GameStatusBase {
  getScore(): string {
    return `Advantage ${this.player1Score > this.player2Score ? this.player1Name : this.player2Name}`;
  }
}

class Win extends GameStatusBase {
  getScore(): string {
    return `Win for ${this.player1Score > this.player2Score ? this.player1Name : this.player2Name}`;
  }
}

class Regular extends GameStatusBase {
  getScore(): string {
    return `${this.getScoreString(this.player1Score)}-${this.getScoreString(this.player2Score)}`;
  }
}

class GameStatusFactory {
  static createGameStatus(player1Score: number, player2Score: number, player1Name: string, player2Name: string): GameStatusBase {
    const minusResult: number = player1Score - player2Score;
    if (minusResult === 0) {
      return new Even(player1Score, player2Score, player1Name, player2Name);
    }
    if (player1Score >= 4 || player2Score >= 4) {
      return Math.abs(minusResult) >= 2
        ? new Win(player1Score, player2Score, player1Name, player2Name)
        : new Advantage(player1Score, player2Score, player1Name, player2Name);
    }
    return new Regular(player1Score, player2Score, player1Name, player2Name);
  }
}

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName !== this.player1Name && playerName !== this.player2Name) {
      throw new Error('Invalid player name');
    }
    if (playerName === this.player1Name)
      this.player1Score += 1;
    else
      this.player2Score += 1;
  }

  getScore(): string {
    const gameStatus = GameStatusFactory.createGameStatus(this.player1Score, this.player2Score, this.player1Name, this.player2Name);
    return gameStatus.getScore();
  }
}
