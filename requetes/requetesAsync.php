<?php
require_once('fonctionsDB.php');

$connexion = connexionDB();
$request_payload = file_get_contents('php://input');
$data = json_decode($request_payload, true);

if (isset($data['action'])) {

    switch ($data['action']) {

        case 'getAllTasks':
            $tasks = mysqli_fetch_all(getAllTasks(), MYSQLI_ASSOC);
            echo json_encode($tasks);
            break;
        
        case 'addTask':
            if (isset($data['tache'], $data['description'], $data['importance'])) {

                $taskId = addTask($data['tache'], $data['description'], $data['importance']);

                echo $taskId;
                // echo json_encode(['id' => $taskId]);
            }
            break;

        case 'deleteTask':
            if (isset($data['id'])) {

                deleteTask($data['id']);
                // echo json_encode(['success' => true]);
            }
            break;

        case 'trierAlpha':
            $tasks = trierAlpha();
            $data = mysqli_fetch_all($tasks);

            echo json_encode($data);
            break;

        case 'trierImportance':
            $tasks = trierImportance();
            $data = mysqli_fetch_all($tasks);
            
            echo json_encode($data);
            break;

        case 'getDetails':
            if (isset($data['id'])) {

               $id = htmlspecialchars($data['id']);
               $data = mysqli_fetch_assoc(getDetails($id));
               header('Content-type: application/json; charset=utf-8');
               echo json_encode($data);
            } else {
                echo 'Erreur';
            }
            break;

        default:
    }
} else {
    
    echo 'Erreur action';
}
?>
