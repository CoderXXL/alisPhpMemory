<?php
session_start();


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


function getCardPairCode($cardCode)
{
    return 'blubber';
}