import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';

void main() {
  runApp(const AmbulanceApp());
}

class AmbulanceApp extends StatelessWidget {
  const AmbulanceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MapScreen(),
    );
  }
}

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {

  GoogleMapController? mapController;
  LatLng currentPosition = const LatLng(0, 0);

  Future<void> getLocation() async {

    LocationPermission permission = await Geolocator.requestPermission();

    Position position = await Geolocator.getCurrentPosition();

    setState(() {
      currentPosition = LatLng(position.latitude, position.longitude);
    });

    mapController?.animateCamera(
      CameraUpdate.newLatLngZoom(currentPosition, 16),
    );
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
    getLocation();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Ambulance Tracker")),
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: const CameraPosition(
          target: LatLng(17.385044, 78.486671),
          zoom: 12,
        ),
        markers: {
          Marker(
            markerId: const MarkerId("ambulance"),
            position: currentPosition,
          )
        },
      ),
    );
  }
}