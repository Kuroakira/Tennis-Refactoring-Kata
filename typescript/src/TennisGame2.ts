import { TennisGame } from './TennisGame';

export class TennisGame2 implements TennisGame {
  p1point: number = 0;
  p2point: number = 0;

  private player1Name: string;
  private player2Name: string;
  private scoreStrings: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let score: string = '';
    if (this.p1point === this.p2point) {
      return this.p1point < 3 ? `${this.scoreStrings[this.p1point]}-All` : 'Deuce';
    }

    if (this.p1point >= 4 || this.p2point >= 4) {
      const diffPoint = this.p1point - this.p2point;
      if (Math.abs(diffPoint) === 1) {
        return `Advantage ${diffPoint > 0 ? this.player1Name : this.player2Name}`;
      }

      return `Win for ${diffPoint > 0 ? this.player1Name : this.player2Name}`;
    }

    return `${this.scoreStrings[this.p1point]}-${this.scoreStrings[this.p2point]}`;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.p1point++;
    else
      this.p2point++;
  }
}
