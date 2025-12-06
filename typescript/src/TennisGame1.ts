import { TennisGame } from './TennisGame';

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
    if (playerName === this.player1Name)
      this.player1Score += 1;
    else
      this.player2Score += 1;
  }

  getScore(): string {
    let score: string = '';
    if (this.player1Score === this.player2Score) {
      switch (this.player1Score) {
        case 0:
          score = 'Love-All';
          break;
        case 1:
          score = 'Fifteen-All';
          break;
        case 2:
          score = 'Thirty-All';
          break;
        default:
          score = 'Deuce';
          break;

      }
    }
    else if (this.player1Score >= 4 || this.player2Score >= 4) {
      const minusResult: number = this.player1Score - this.player2Score;
      if (minusResult === 1) score = `Advantage ${this.player1Name}`;
      else if (minusResult === -1) score = `Advantage ${this.player2Name}`;
      else if (minusResult >= 2) score = `Win for ${this.player1Name}`;
      else score = `Win for ${this.player2Name}`;
    }
    else {
      let tempScore: number = 0;
      score = this.getScoreString(this.player1Score) + '-' + this.getScoreString(this.player2Score);
    }
    return score;
  }

  private getScoreString(score: number): string {
    switch (score) {
      case 0:
        return 'Love';
      case 1:
        return 'Fifteen';
      case 2:
        return 'Thirty';
      case 3:
        return 'Forty';
    }
    return '';
  }
}
