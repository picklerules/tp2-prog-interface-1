<?php
	$connexion = connexionDB();
	/**
	 * Connection avec la base de données
	 */
	function connexionDB() {
		define('DB_HOST', 'localhost');
		define('DB_USER', 'root');
		define('DB_PASSWORD', 'root');			// MAC
		//define('DB_PASSWORD', '');			// Windows

		$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
				
		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
		}
		
		$db = mysqli_select_db($laConnexion, 'to-do-list');

		if (!$db) {
			die ('La base de données n\'existe pas.');
		}
		
		mysqli_query($laConnexion, 'SET NAMES "utf8"');
		return $laConnexion;
	}

	/**
	 * Exécute la requête SQL
	 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
	 */
	function executeRequete($requete, $insert = false) {
		global $connexion;
		if ($insert) {
			mysqli_query($connexion, $requete);
			return $connexion->insert_id;
		} else {
			$resultats = mysqli_query($connexion, $requete);
			return $resultats;
		}
	}
	
    /**
     * Récupérer toutes les tâches
     */
    function getAllTasks() {
        
        return executeRequete('SELECT * FROM taches');
    }

    /**
     * Ajout d'une nouvelle tâche
     */
    function addTask($tache, $description, $importance) {
        global $connexion;

        $tache = mysqli_real_escape_string($connexion, $tache);
        $description = mysqli_real_escape_string($connexion, $description);
        $importance = mysqli_real_escape_string($connexion, $importance);

        return executeRequete("INSERT INTO taches (tache, description, importance) VALUES ('$tache', '$description', '$importance')", true);
    }

    /**
     * Supprimer une tâche
     */
    function deleteTask($id) {
        global $connexion;

        $id = intval($id);
		
        executeRequete("DELETE FROM taches WHERE id = $id");
    }

	function trierAlpha() {
		
        return executeRequete('SELECT * FROM taches ORDER BY tache ASC');
	}


	function trierImportance() {

        return executeRequete('SELECT * FROM taches ORDER BY importance ASC');
    }

	     /**
     * Récupérer les détails de la tâche
     */
    function getDetails($id) {
		global $connexion;

        $id = mysqli_real_escape_string($connexion, $id);
		
        return executeRequete("SELECT * FROM taches WHERE id = $id");
    }

?>
