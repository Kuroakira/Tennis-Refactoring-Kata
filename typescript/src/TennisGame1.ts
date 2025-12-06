import { TennisGame } from './TennisGame';

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
    if (playerName === this.player1Name)
      this.player1Score += 1;
    else
      this.player2Score += 1;
  }

  getScore(): string {
    if (this.player1Score === this.player2Score) {
      return this.getEqualScoreString(this.player1Score);
    }
    else if (this.player1Score >= 4 || this.player2Score >= 4) {
      return this.getAdvantageOrWinString(this.player1Score - this.player2Score);
    }
    return this.getScoreString(this.player1Score) + '-' + this.getScoreString(this.player2Score);
  }
  private getScoreString(score: number): string {
    return this.scoreMap.get(score) || '';
  }
  private getEqualScoreString(score: number): string {
    if (this.player1Score >= 3) {
      return 'Deuce';
    }
    return this.getScoreString(this.player1Score) + '-All';
  }
  private getAdvantageOrWinString(minusResult: number): string {
    if (Math.abs(minusResult) === 1) {
      return `Advantage ${minusResult > 0 ? this.player1Name : this.player2Name}`;
    }
    return `Win for ${minusResult > 0 ? this.player1Name : this.player2Name}`;
  }
}
