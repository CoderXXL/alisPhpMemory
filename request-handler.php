<?php
session_start();

require_once('assets/php/Memory.php');

header('Content-type: application/json');


try {
    if ($_SERVER['REQUEST_METHOD'] !== "POST") {
        throw new Exception('Invalid Request', 2000);
    } else {

        $json = file_get_contents('php://input');
        $request = json_decode($json);

        $status = false;
        $response = '';
        
        if ($request->name === 'getCardPairCode') {
            $status = true;
            $response = getCardPairCode($request->data);
        }
        
        exit(json_encode(
            array(
                'status' => $status,
                'data' => $response
            )
        ));
    }
} catch(Exception $e) {
    echo json_encode(
        array (
            'status' => false,
            'error' => $e->getMessage(),
            'error_code' => $e->getCode()
        )
    );

    exit;
}

if (!isset($_SESSION['memory'])) {
    return;
}

$memory = unserialize($_SESSION['memory']);

return $memory->getPairIdByCardId($cardCode);

function getCardPairCode($cardCode)
{
}