import { TennisGame } from './TennisGame';

enum GameStatus {
  EVEN = 'even',
  ADVANTAGE = 'advantage',
  WIN = 'win',
  REGULAR = 'regular',
}

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1Name: string;
  private player2Name: string;
  private scoreMap: Map<number, string> = new Map([
    [0, 'Love'],
    [1, 'Fifteen'],
    [2, 'Thirty'],
    [3, 'Forty'],
  ]);

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
    const gameStatus = this.getGameStatus(this.player1Score, this.player2Score);
    switch (gameStatus) {
      case GameStatus.EVEN:
        return this.getEqualScoreString(this.player1Score);
      case GameStatus.ADVANTAGE:
        return this.getAdvantageString(this.player1Score - this.player2Score);
      case GameStatus.WIN:
        return this.getWinString(this.player1Score - this.player2Score);
      default:
        return this.getRegularScoreString(this.player1Score, this.player2Score);
    }
  }
  private getGameStatus(player1Score: number, player2Score: number): GameStatus {
    const minusResult: number = player1Score - player2Score;
    if (minusResult === 0) {
      return GameStatus.EVEN;
    }
    if (this.isScoreOver4(player1Score, player2Score)) {
      return Math.abs(minusResult) >= 2 ? GameStatus.WIN : GameStatus.ADVANTAGE;
    }
    return GameStatus.REGULAR;
  }

  private isScoreOver4(player1Score: number, player2Score: number): boolean {
    return player1Score >= 4 || player2Score >= 4;
  }

  private getRegularScoreString(player1Score: number, player2Score: number): string {
    return `${this.getScoreString(player1Score)}-${this.getScoreString(player2Score)}`;
  }

  private getScoreString(score: number): string {
    return this.scoreMap.get(score) || '';
  }

  private getEqualScoreString(score: number): string {
    if (score >= 3) {
      return 'Deuce';
    }
    return `${this.getScoreString(score)}-All`;
  }

  private getAdvantageString(minusResult: number): string {
    return `Advantage ${minusResult > 0 ? this.player1Name : this.player2Name}`;
  }

  private getWinString(minusResult: number): string {
    return `Win for ${minusResult > 0 ? this.player1Name : this.player2Name}`;
  }
}
