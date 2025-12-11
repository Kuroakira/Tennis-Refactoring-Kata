import { TennisGame } from './TennisGame';

export class TennisGame4  implements TennisGame {

    public player1 : Player;
    public player2 : Player;

    constructor(player1: string, player2: string) {
        this.player1 = new Player(player1, true);
        this.player2 = new Player(player2, false);
    }

    wonPoint(name: string) {
        const scorer = this.getScorerByName(name);
        scorer.winPoint();
    }

    getScorerByName(name: string): Player {
        if (name === this.player1.name) {
            return this.player1;
        }
        return this.player2;
    }

    getScore() {
        const server = this.player1.isServing ? this.player1 : this.player2;
        const receiver = this.player1.isServing ? this.player2 : this.player1;

        const scoreHandler = new WinHandler();
        scoreHandler.setNextHandler(new AdvantageHandler())
                    .setNextHandler(new DeuceHandler())
                    .setNextHandler(new NormalScoreHandler());

        const result = scoreHandler.handle(server, receiver);
        if (result) {
            return result;
        }
        throw new Error("No handler found");
    }
}

class Player {
    readonly name: string;
    private score: number;
    isServing: boolean;
    constructor(name: string, isServing: boolean) {
        this.name = name;
        this.score = 0;
        this.isServing = isServing;
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

    handle(server: Player, receiver: Player): string | null {
        const result = this.process(server, receiver);
        if (result) {
            return result
        }

        if (this.nextHandler) {
            return this.nextHandler.handle(server, receiver);
        }

        throw new Error("No handler found");
    }

    protected abstract process(server: Player, receiver: Player): string | null;
}

class DeuceHandler extends ScoreHandler {
    protected process(server: Player, receiver: Player): string | null {
        if (server.getScore() === receiver.getScore() && server.getScore() >= 3) {
            return "Deuce";
        }
        return null;
    }
}

class AdvantageHandler extends ScoreHandler {
    protected process(server: Player, receiver: Player): string | null {

        const diffScore = Math.abs(server.getScore() - receiver.getScore());
        if (diffScore === 1 && (server.getScore() >= 4 || receiver.getScore() >= 4)) {
            return "Advantage " + (server.getScore() > receiver.getScore() ? server.name : receiver.name);
        }
        return null;
    }
}

class WinHandler extends ScoreHandler {
    protected process(server: Player, receiver: Player): string | null {
        const diffScore = Math.abs(server.getScore() - receiver.getScore());
        if (diffScore >= 2 && (server.getScore() >= 4 || receiver.getScore() >= 4)) {
            return "Win for " + (server.getScore() > receiver.getScore() ? server.name : receiver.name);
        }
        return null;
    }
}

class NormalScoreHandler extends ScoreHandler {
    private static readonly scores: string[] = ["Love", "Fifteen", "Thirty", "Forty"];

    protected process(server: Player, receiver: Player): string | null {

        if (server.getScore() === receiver.getScore()) {
            return this.format(server.getScore()) + "-All";
        }

        return this.format(server.getScore()) + "-" + this.format(receiver.getScore());
    }

    private format(score: number): string {
        return NormalScoreHandler.scores[score];
    }
}
