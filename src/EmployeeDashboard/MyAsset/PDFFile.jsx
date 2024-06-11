import React, { useContext } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { AuthContext } from '../../Provider/Provider';
import useUser from '../../Hooks/useUser';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  footer: {
    marginTop: 10,
    padding: 10,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray'
  }
});

// Get current date
const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const PDFFile = ({ asset,myHr }) =>{
   
    return (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
            {/* {myHr?.Company_logo && <Image style={styles.image} src={myHr.Company_logo} />} */}
              <Text>Company Name: {myHr?.CompanyName}</Text>
              <Text>Hr Manager Name: {myHr?.Name}</Text>
              <Text>Hr Manager Email:{myHr?.email}</Text>
              <Text>

**About Our Company**

At {myHr?.CompanyName}, we pride ourselves on delivering exceptional product/service to our clients. With a dedicated team of professionals and a commitment to excellence, we strive to exceed expectations in every aspect of our operations.

Established in 2010, {myHr?.CompanyName}  has rapidly grown into a leading provider of product. Our success is driven by our core values of integrity, innovation, and customer satisfaction.

    
**Our Mission**

Our mission at {myHr?.CompanyName}  is to Provide Best Service and good quality. We ensuring that our clients receive the highest quality product and unparalleled support.


**Why Choose Us?**

- **Quality:** We maintain stringent quality standards to ensure that every product meets or exceeds industry benchmarks.
  
- **Innovation:** We embrace innovation and continuously explore new technologies and methodologies to improve our offerings.
  
- **Customer Satisfaction:** Our clients are at the heart of everything we do. We prioritize customer satisfaction and strive to build long-lasting relationships based on trust and mutual respect.

**Contact Us**

For inquiries or to learn more about our products and services, please contact us at:

 
</Text>
                
            </View>
            <View style={styles.section}>
              <Text>Asset Related Information</Text>
              <Text>Product Name: {asset?.assetName}</Text>
              <Text>Product Type: {asset?.assetType}</Text>
              <Text>Product Quantity: {asset?.assetQuantity}</Text>
              
             
             
            </View>
            <Text style={styles.footer}>Printed on: {getCurrentDate()}</Text>
          </Page>
        </Document>
      );
}

export default PDFFile;
