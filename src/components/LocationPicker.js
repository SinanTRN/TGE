import { donationPoints, volunteerPoints } from '../utils/PointsData';
import {ScrollView, View} from "react-native";

const LocationPicker = () => {
    return (
        <View>
            <View style={styles.mapPreview}>
                {/* ...mevcut önizleme... */}
                <ScrollView>
                    <Text style={styles.sectionTitle}>Yakındaki Bağış Noktaları</Text>
                    {donationPoints.map(point => (
                        <Text key={point.id}>{point.title}</Text>
                    ))}

                    <Text style={styles.sectionTitle}>Gönüllülük Projeleri</Text>
                    {volunteerPoints.map(point => (
                        <Text key={point.id}>{point.title}</Text>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};
