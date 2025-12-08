import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1Name: string;
  private player2Name: string;
  private static readonly scoreStrings: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    if (this.player1Score === this.player2Score && this.player1Score >= 3) {
      return 'Deuce';
    }

    if (this.player1Score < 4 && this.player2Score < 4) {
      const result = TennisGame3.scoreStrings[this.player1Score];
      return (this.player1Score === this.player2Score) ? result + '-All' : result + '-' + TennisGame3.scoreStrings[this.player2Score];
    }

    const leadingPlayer = this.player1Score > this.player2Score ? this.player1Name : this.player2Name;
    return (Math.abs(this.player1Score - this.player2Score) === 1) ? `Advantage ${leadingPlayer}` : `Win for ${leadingPlayer}`;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.player1Score += 1;
    else
      this.player2Score += 1;
  }
}
