import { TennisGame } from './TennisGame';

interface Point {
  toString(): string;
  next(opponent: Point, isScoringPlayer1: boolean): GameState;
}

class Love implements Point {
  toString(): string {
    return 'Love';
  }
  next(opponent: Point, isScoringPlayer1: boolean): GameState {
    const player1Point = isScoringPlayer1 ? new Fifteen() : opponent;
    const player2Point = isScoringPlayer1 ? opponent : new Fifteen();
    return new RunningScore(player1Point, player2Point);
  }
}

class Fifteen implements Point {
  toString(): string {
    return 'Fifteen';
  }
  next(opponent: Point, isScoringPlayer1: boolean): GameState {
    const player1Point = isScoringPlayer1 ? new Thirty() : opponent;
    const player2Point = isScoringPlayer1 ? opponent : new Thirty();

    return new RunningScore(player1Point, player2Point);
  }
}

class Thirty implements Point {
  toString(): string {
    return 'Thirty';
  }
  next(opponent: Point, isScoringPlayer1: boolean): GameState {
    if (opponent instanceof Forty) {
      return new Deuce();
    }

    const player1Point = isScoringPlayer1 ? new Forty() : opponent;
    const player2Point = isScoringPlayer1 ? opponent : new Forty();

    return new RunningScore(player1Point, player2Point);
  }
}

class Forty implements Point {
  toString(): string {
    return 'Forty';
  }
  next(opponent: Point, isScoringPlayer1: boolean): GameState {
    return new Win(isScoringPlayer1);
  }
}

interface GameState {
  // ポイントを取ったら、次の「新しい状態」を返す（自分自身は書き換えない）
  player1Scored(): GameState;
  player2Scored(): GameState;

  // その状態のスコア文字列を返す
  getScore(p1Name: string, p2Name: string): string;
}

class RunningScore implements GameState {
  private player1Point: Point = new Love();
  private player2Point: Point = new Love();

  constructor(player1Point: Point, player2Point: Point) {
    this.player1Point = player1Point;
    this.player2Point = player2Point;
  }

  player1Scored(): GameState {
    return this.player1Point.next(this.player2Point, true);
  }
  player2Scored(): GameState {
    return this.player2Point.next(this.player1Point, false);
  }
  getScore(p1Name: string, p2Name: string): string {
    if (this.player1Point.toString() === this.player2Point.toString()) {
      return `${this.player1Point.toString()}-All`;
    }
    return `${this.player1Point.toString()}-${this.player2Point.toString()}`;
  }
}

class Advantage implements GameState {
  private isPlayer1Advantage: boolean;

  constructor(isPlayer1Advantage: boolean) {
    this.isPlayer1Advantage = isPlayer1Advantage;
  }

  player1Scored(): GameState {
    return this.isPlayer1Advantage ? new Win(true) : new Deuce();
  }
  player2Scored(): GameState {
    return this.isPlayer1Advantage ? new Deuce() : new Win(false);
  }
  getScore(p1Name: string, p2Name: string): string {
    return `Advantage ${this.isPlayer1Advantage ? p1Name : p2Name}`;
  }
}

class Deuce implements GameState {
  player1Scored(): GameState {
    return new Advantage(true);
  }
  player2Scored(): GameState {
    return new Advantage(false);
  }
  getScore(p1Name: string, p2Name: string): string {
    return 'Deuce';
  }
}
class Win implements GameState {
  private isPlayer1Win: boolean;

  constructor(isPlayer1Win: boolean) {
    this.isPlayer1Win = isPlayer1Win;
  }

  player1Scored(): GameState {
    return new Win(true);
  }
  player2Scored(): GameState {
    return new Win(false);
  }
  getScore(p1Name: string, p2Name: string): string {
    return `Win for ${this.isPlayer1Win ? p1Name : p2Name}`;
  }
}

export class TennisGame1 implements TennisGame {
  private state: GameState;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.state = new RunningScore(new Love(), new Love());
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.state = this.state.player1Scored();
    } else {
      this.state = this.state.player2Scored();
    }
  }

  getScore(): string {
    return this.state.getScore(this.player1Name, this.player2Name);
  }
}
