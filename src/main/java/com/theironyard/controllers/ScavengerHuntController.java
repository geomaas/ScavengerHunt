package com.theironyard.controllers;

import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;
import com.theironyard.entities.Clue;
import com.theironyard.entities.Game;
import com.theironyard.entities.Team;
import com.theironyard.services.AnswerRepository;
import com.theironyard.services.ClueRepository;
import com.theironyard.services.GameRepository;
import com.theironyard.services.TeamRepository;
import org.apache.catalina.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 * Created by Erik on 7/20/16.
 */
@RestController
public class ScavengerHuntController {

    @Autowired
    TeamRepository teams;

    @Autowired
    GameRepository games;

    @Autowired
    ClueRepository clues;

    @Autowired
    AnswerRepository answers;



    // initialize the database
    @PostConstruct
    public void init() throws FileNotFoundException {
        parseClues("clues.tsv");
    }

    @RequestMapping(path = "/create-team", method = RequestMethod.POST)
    public Team newTeam(String teamName, HttpSession session) {
        Team newTeam = new Team();
        newTeam.setTeamName(teamName);

        teams.save(newTeam);

        session.setAttribute("team", newTeam.getId());

        return newTeam;
    }


    @RequestMapping(path = "/create-game", method = RequestMethod.POST)
    public Game newGame(String lobbyName, HttpSession session) {
       Game newGame = new Game();
        newGame.setLobbyName(lobbyName);

        games.save(newGame);

        session.setAttribute("gameId", newGame.getId());

        return newGame;
    }

    @RequestMapping(path = "/add-team/{game_id}", method = RequestMethod.PUT)
    public Team addTeam (String teamName, HttpSession session) {
        Team addTeam = new Team();
        addTeam.setTeamName(teamName);

        return addTeam;


    }

    @RequestMapping(path = "/start-game/{game_id}", method = RequestMethod.POST)
    public Game startGame() {

    }


    @RequestMapping(path = "/at-location/{team_id}/{game_id}", method = RequestMethod.PUT)


    @RequestMapping(path = "/cancel-game/{game_id}", method = RequestMethod.DELETE)
    public HttpStatus cancelGame (HttpSession session) {
        session.invalidate();

        return HttpStatus.OK;
    }

    //Parse the .tsv to populate database with clues
    public void parseClues(String fileName) throws FileNotFoundException {
        if (clues.count() == 0) {
            File clueFile = new File(fileName);
            Scanner fileScanner = new Scanner(clueFile);
            fileScanner.nextLine();
            while (fileScanner.hasNext()) {
                String[] columns = fileScanner.nextLine().split("\t");
                Clue clue = new Clue(columns[0], columns[1], Double.valueOf(columns[2]), Double.valueOf(columns[3]));
                clues.save(clue);
            }
        }
    }
}
