let headsXNGD = [
    {
        Guid: 'Guid',
        ParentGuid: null,
        align: 'center',
        children: [],
        headerAlign: 'center',
        label: 'Guid',
        prop: 'Guid',
        width: 10,
    },
    {
        Guid: '_xh',
        ParentGuid: null,
        label: '序号',
        prop: '_xh',
        width: 10,
        headerAlign: 'center',
        align: 'center',
        children: [],
    },
    {
        Guid: 'RecordName',
        ParentGuid: null,
        label: '名称',
        prop: 'RecordName',
        width: 32.5,
        headerAlign: 'center',
        align: 'left',
        children: [],
    },
    {
        Guid: 'csb_3',
        ParentGuid: null,
        label: '部署',
        prop: 'csb_3',
        width: 12.5,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: 'ExtendedAttributeNumber1',
                ParentGuid: 'csb_3',
                label: '钻井口数(口)',
                prop: 'ExtendedAttributeNumber1',
                width: 15,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: 'ExtendedAttributeNumber2',
                ParentGuid: 'csb_3',
                label: '钻井进尺(万米)',
                prop: 'ExtendedAttributeNumber2',
                width: 15,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
        ],
    },
    {
        Guid: 'csb_6',
        ParentGuid: null,
        label: '平均井深(米)',
        prop: 'csb_6',
        width: 12.5,
        headerAlign: 'center',
        align: 'right',
        children: [],
    },
    {
        Guid: 'E80FAD06-1134-486E-8825-0E39EDC6345F',
        ParentGuid: null,
        label: '钻井系统工程米费(元/米)',
        prop: 'FY_GC',
        width: 125,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: '85FE9A37-18EB-4186-875D-DA1505D7FC37',
                ParentGuid: 'E80FAD06-1134-486E-8825-0E39EDC6345F',
                label: '合计',
                prop: 'FY_GC_HJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                ParentGuid: 'E80FAD06-1134-486E-8825-0E39EDC6345F',
                label: '钻井工程',
                prop: 'FY_GC_ZJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [
                    {
                        Guid: '77215176-22BC-431F-948D-92393471EC91',
                        ParentGuid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                        label: '小计',
                        prop: 'FY_GC_ZJ_XJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: '91C9CD2B-4235-4821-9F50-90035F1F14B0',
                        ParentGuid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                        label: '钻前',
                        prop: 'FY_GC_ZJ_ZQ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'D0752E23-955C-4A91-B978-EF45AF519923',
                        ParentGuid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                        label: '纯钻',
                        prop: 'FY_GC_ZJ_CZ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'A401C47B-45E8-4BAA-8904-40C56E022EEE',
                        ParentGuid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                        label: '固井',
                        prop: 'FY_GC_ZJ_GJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: '5A0594DE-C4A4-4C3F-BA6D-28E42EB76466',
                        ParentGuid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                        label: '录井',
                        prop: 'FY_GC_ZJ_LJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'AB17D8EB-D465-4E23-80DD-843E870AFAC9',
                        ParentGuid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                        label: '测井',
                        prop: 'FY_GC_ZJ_CJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: '1B0DC6B0-A162-4C91-8C96-568622788742',
                        ParentGuid: 'F5FFDE7E-919A-4614-8823-961D8F96FB0E',
                        label: '桥射联作',
                        prop: 'FY_GC_ZJ_QS',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                ],
            },
            {
                Guid: 'F54EECC8-41B9-4E5A-884F-3DE9E66E6722',
                ParentGuid: 'E80FAD06-1134-486E-8825-0E39EDC6345F',
                label: '试油压裂工程',
                prop: 'FY_GC_SY',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
        ],
    },
    {
        Guid: '2B5FA34B-56A3-49BA-904A-6F1FDA455D1A',
        ParentGuid: null,
        label: '安全环保(元/米)',
        prop: 'FY_AQM',
        width: 37.5,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: '9A8083B8-55DB-4533-A9A6-9AD7B72152A3',
                ParentGuid: '2B5FA34B-56A3-49BA-904A-6F1FDA455D1A',
                label: '合计',
                prop: 'FY_AQM_HJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '7B945C8F-8EF2-49CB-96A4-D80205B93167',
                ParentGuid: '2B5FA34B-56A3-49BA-904A-6F1FDA455D1A',
                label: '钻井废液固处理',
                prop: 'FY_AQM_ZJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: 'FC130ED3-3A90-4FC0-8E51-58266B93D1A1',
                ParentGuid: '2B5FA34B-56A3-49BA-904A-6F1FDA455D1A',
                label: '压裂返排液处理',
                prop: 'FY_AQM_YL',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
        ],
    },
    {
        Guid: '92BAFD34-EE69-4DAA-B48E-31AD4C65E8D2',
        ParentGuid: null,
        label: '钻井系统工程单井费用(万元/口井)',
        prop: 'FY_DJ',
        width: 125,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: '8378C211-7105-4BF4-85E4-78219EE948D1',
                ParentGuid: '92BAFD34-EE69-4DAA-B48E-31AD4C65E8D2',
                label: '合计',
                prop: 'FY_DJ_HJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '99D08418-5399-415D-AB13-483311AEBFC7',
                ParentGuid: '92BAFD34-EE69-4DAA-B48E-31AD4C65E8D2',
                label: '钻井工程',
                prop: 'FY_DJ_ZJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [
                    {
                        Guid: '67414487-748A-45EA-ACED-7D7AE3CA2AA4',
                        ParentGuid: '99D08418-5399-415D-AB13-483311AEBFC7',
                        label: '小计',
                        prop: 'FY_DJ_ZJ_XJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'E28911E6-610E-40FA-8145-55B4266A89F2',
                        ParentGuid: '99D08418-5399-415D-AB13-483311AEBFC7',
                        label: '钻前',
                        prop: 'FY_DJ_ZJ_ZQ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'DD989C64-198F-4DC2-998F-3AF313CBA0F7',
                        ParentGuid: '99D08418-5399-415D-AB13-483311AEBFC7',
                        label: '纯钻',
                        prop: 'FY_DJ_ZJ_CZ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: '7FB22249-CC5D-4103-8EF3-2A1099B62E0B',
                        ParentGuid: '99D08418-5399-415D-AB13-483311AEBFC7',
                        label: '固井',
                        prop: 'FY_DJ_ZJ_GJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: '914C1CA0-F725-414A-98D2-D572F1D37D5D',
                        ParentGuid: '99D08418-5399-415D-AB13-483311AEBFC7',
                        label: '录井',
                        prop: 'FY_DJ_ZJ_LJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'F6E3DD30-242E-4C75-9600-1BAED4805018',
                        ParentGuid: '99D08418-5399-415D-AB13-483311AEBFC7',
                        label: '测井',
                        prop: 'FY_DJ_ZJ_CJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'E0953B45-30B7-48A7-AE55-5B54C10637C1',
                        ParentGuid: '99D08418-5399-415D-AB13-483311AEBFC7',
                        label: '桥射联作',
                        prop: 'FY_DJ_ZJ_QS',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                ],
            },
            {
                Guid: '55BB0348-BB9F-47ED-BC9D-8F0D5AD667EC',
                ParentGuid: '92BAFD34-EE69-4DAA-B48E-31AD4C65E8D2',
                label: '试油压裂工程',
                prop: 'FY_DJ_SY',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
        ],
    },

    {
        Guid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
        ParentGuid: null,
        label: '甲方承担费用成本',
        prop: 'FY_JF',
        width: 12.5,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: '65B65D26-505A-4F25-B0A1-9437916D8BB8',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '征地',
                prop: 'FY_JF_ZD',
                width: 62.5,
                headerAlign: 'center',
                align: 'right',
                children: [
                    {
                        Guid: 'EA2DA51C-68F0-4F40-A13E-943ADCBF27FB',
                        ParentGuid: '65B65D26-505A-4F25-B0A1-9437916D8BB8',
                        label: '总计征地(亩)',
                        prop: 'FY_JF_ZD_ZL',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'F2DE3F0D-D7DC-40A7-8408-AE0C0788AEFD',
                        ParentGuid: '65B65D26-505A-4F25-B0A1-9437916D8BB8',
                        label: '征地费用(万元)',
                        prop: 'FY_JF_ZD_FY',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: '8DDF8255-CA4B-4ED3-BA4A-045E095B4558',
                        ParentGuid: '65B65D26-505A-4F25-B0A1-9437916D8BB8',
                        label: '每口井征地(亩/口)',
                        prop: 'FY_JF_ZD_KJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: 'FD2051FE-6BFE-42CF-9565-E129F7D49F3C',
                        ParentGuid: '65B65D26-505A-4F25-B0A1-9437916D8BB8',
                        label: '土地价格(万元/亩)',
                        prop: 'FY_JF_ZD_JG',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                    {
                        Guid: '28A1E0BF-0F83-47C9-ABA8-41B90290D8FE',
                        ParentGuid: '65B65D26-505A-4F25-B0A1-9437916D8BB8',
                        label: '平均征地单位成本',
                        prop: 'FY_JF_ZD_CB',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                ],
            },
            {
                Guid: '9AC61DBB-0115-47E0-9A92-77924B2C5319',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '套管(万元/口井)',
                prop: 'FY_JF_TG',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '7FB4E1BF-94EF-4624-B73D-17B62AC0307D',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '留井油管(万元/口井)',
                prop: 'FY_JF_YG',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: 'DF3CC369-2CC8-4069-8C32-E285215CC8EE',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '支撑剂(万元/口井)',
                prop: 'FY_JF_ZCJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '2EDC9D09-AAE9-4790-9D13-40E340713CD7',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '化工料(万元/口井)',
                prop: 'FY_JF_HGL',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: 'E1DC0DC7-C494-4869-8018-AB22FF0F19D0',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '监督费(万元/口井)',
                prop: 'FY_JF_JD',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '7657DF7B-E1FD-4742-8DBD-9DAE8EE2D37B',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '建设期利息(万元/口井)',
                prop: 'FY_JF_LX',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '47A9FD05-BC4C-4315-B4BF-AEF9AE987C70',
                ParentGuid: '8049D7F2-4594-4ADF-B951-52352BA840DC',
                label: '合计',
                prop: 'FY_JF_HJ',
                width: 0,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
        ],
    },
    {
        Guid: 'C3C8F363-CE78-4353-A9FF-5E88FB94C164',
        ParentGuid: null,
        label: '总投资',
        prop: 'FY_ZTZ',
        width: 50,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: '22E6F85D-946B-408B-B2BD-5D6620BBB988',
                ParentGuid: 'C3C8F363-CE78-4353-A9FF-5E88FB94C164',
                label: '合计',
                prop: 'FY_ZTZ_HJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: 'ABC0865A-78A7-446A-BD68-0BEB0CCE762F',
                ParentGuid: 'C3C8F363-CE78-4353-A9FF-5E88FB94C164',
                label: '技术服务投资',
                prop: 'FY_ZTZ_JS',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: 'A8CA9747-05F8-4B02-A91A-796DFD9B89F1',
                ParentGuid: 'C3C8F363-CE78-4353-A9FF-5E88FB94C164',
                label: '甲方承担投资',
                prop: 'FY_ZTZ_JF',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '3C38EF6A-0B1E-466E-887B-6DE8ADED072E',
                ParentGuid: 'C3C8F363-CE78-4353-A9FF-5E88FB94C164',
                label: '管理费',
                prop: 'FY_ZTZ_GL',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
        ],
    },
    {
        Guid: '4FEB5705-DB0D-4E8A-9341-6FCD97973A43',
        ParentGuid: null,
        label: '工程投资(万元)',
        prop: 'FY_GCTZ',
        width: 150,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: 'F4CDDD2B-702A-4014-A5E0-DFE04B00B28B',
                ParentGuid: '4FEB5705-DB0D-4E8A-9341-6FCD97973A43',
                label: '小计',
                prop: 'FY_GCTZ_XJ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },

            {
                Guid: '12135DE6-A947-45BA-93FA-07347B5C87E9',
                ParentGuid: '4FEB5705-DB0D-4E8A-9341-6FCD97973A43',
                label: '安全环保',
                prop: 'FY_GCTZ_AQ',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [
                    {
                        Guid: 'E5F04AE3-7C0B-4B03-8F69-AEA36ACFB44D',
                        ParentGuid: '12135DE6-A947-45BA-93FA-07347B5C87E9',
                        label: '小计',
                        prop: 'FY_GCTZ_AQ_XJ',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },

                    {
                        Guid: '7B099C51-C004-4A83-BB87-60C90A497449',
                        ParentGuid: '12135DE6-A947-45BA-93FA-07347B5C87E9',
                        label: '压裂返排液处理',
                        prop: 'FY_GCTZ_AQ_YL',
                        width: 12.5,
                        headerAlign: 'center',
                        align: 'right',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        Guid: '58D3CCBB-F62D-4F44-A0F8-24F9BB4FEC74',
        ParentGuid: null,
        label: '甲方费用投资',
        prop: 'FY_JFTZ',
        width: 100,
        headerAlign: 'center',
        align: 'right',
        children: [
            {
                Guid: 'F6285390-4956-4EEC-83C7-2C60D75B3304',
                ParentGuid: '58D3CCBB-F62D-4F44-A0F8-24F9BB4FEC74',
                label: '管理费',
                prop: 'FY_JFTZ_GLF',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
            {
                Guid: '81F5390F-79EB-4FCF-9D94-DC37052EAC15',
                ParentGuid: '58D3CCBB-F62D-4F44-A0F8-24F9BB4FEC74',
                label: '其它',
                prop: 'FY_JFTZ_QT',
                width: 12.5,
                headerAlign: 'center',
                align: 'right',
                children: [],
            },
        ],
    },
];

let testData = [
    {
        ExtendedAttributeNumber1: 'ExtendedAttributeNumber1',
        ExtendedAttributeNumber2: 'ExtendedAttributeNumber2',
        csb_6: 'csb_6',
        FY_GC_HJ: '85FE9A37-18EB-4186-875D-DA1505D7FC37',
        FY_GC_ZJ_XJ: '77215176-22BC-431F-948D-92393471EC91',
        FY_GC_ZJ_ZQ: '91C9CD2B-4235-4821-9F50-90035F1F14B0',
        FY_GC_ZJ_CZ: 'D0752E23-955C-4A91-B978-EF45AF519923',
        FY_GC_ZJ_GJ: 'A401C47B-45E8-4BAA-8904-40C56E022EEE',
        FY_GC_ZJ_LJ: '5A0594DE-C4A4-4C3F-BA6D-28E42EB76466',
        FY_GC_ZJ_CJ: 'AB17D8EB-D465-4E23-80DD-843E870AFAC9',
        FY_GC_ZJ_QS: '1B0DC6B0-A162-4C91-8C96-568622788742',
        FY_GC_SY: 'F54EECC8-41B9-4E5A-884F-3DE9E66E6722',
        FY_AQM_HJ: '9A8083B8-55DB-4533-A9A6-9AD7B72152A3',
        FY_AQM_ZJ: '7B945C8F-8EF2-49CB-96A4-D80205B93167',
        FY_AQM_YL: 'FC130ED3-3A90-4FC0-8E51-58266B93D1A1',
        FY_DJ_HJ: '8378C211-7105-4BF4-85E4-78219EE948D1',
        FY_DJ_ZJ_XJ: '67414487-748A-45EA-ACED-7D7AE3CA2AA4',
        FY_DJ_ZJ_ZQ: 'E28911E6-610E-40FA-8145-55B4266A89F2',
        FY_DJ_ZJ_CZ: 'DD989C64-198F-4DC2-998F-3AF313CBA0F7',
        FY_DJ_ZJ_GJ: '7FB22249-CC5D-4103-8EF3-2A1099B62E0B',
        FY_DJ_ZJ_LJ: '914C1CA0-F725-414A-98D2-D572F1D37D5D',
        FY_DJ_ZJ_CJ: 'F6E3DD30-242E-4C75-9600-1BAED4805018',
        FY_DJ_ZJ_QS: 'E0953B45-30B7-48A7-AE55-5B54C10637C1',
        FY_DJ_SY: '55BB0348-BB9F-47ED-BC9D-8F0D5AD667EC',
        FY_AQK_HJ: 'D3CCC18E-490E-4C70-9579-092ACD35B2F6',
        FY_AQK_ZJ: '3FA50B2E-09AF-40F0-B5CC-2A1B407F8139',
        FY_AQK_YL: '810CCB70-C2E9-49EE-BAC1-D2223FB75A24',
        FY_JF_ZD_ZL: 'EA2DA51C-68F0-4F40-A13E-943ADCBF27FB',
        FY_JF_ZD_FY: 'F2DE3F0D-D7DC-40A7-8408-AE0C0788AEFD',
        FY_JF_ZD_KJ: '8DDF8255-CA4B-4ED3-BA4A-045E095B4558',
        FY_JF_ZD_JG: 'FD2051FE-6BFE-42CF-9565-E129F7D49F3C',
        FY_JF_ZD_CB: '28A1E0BF-0F83-47C9-ABA8-41B90290D8FE',
        FY_JF_TG: '9AC61DBB-0115-47E0-9A92-77924B2C5319',
        FY_JF_YG: '7FB4E1BF-94EF-4624-B73D-17B62AC0307D',
        FY_JF_ZCJ: 'DF3CC369-2CC8-4069-8C32-E285215CC8EE',
        FY_JF_HGL: '2EDC9D09-AAE9-4790-9D13-40E340713CD7',
        FY_JF_JD: 'E1DC0DC7-C494-4869-8018-AB22FF0F19D0',
        FY_JF_LX: '7657DF7B-E1FD-4742-8DBD-9DAE8EE2D37B',
        FY_JF_HJ: '47A9FD05-BC4C-4315-B4BF-AEF9AE987C70',
        FY_ZTZ_HJ: '22E6F85D-946B-408B-B2BD-5D6620BBB988',
        FY_ZTZ_JS: 'ABC0865A-78A7-446A-BD68-0BEB0CCE762F',
        FY_ZTZ_JF: 'A8CA9747-05F8-4B02-A91A-796DFD9B89F1',
        FY_ZTZ_GL: '3C38EF6A-0B1E-466E-887B-6DE8ADED072E',
        FY_GCTZ_XJ: 'F4CDDD2B-702A-4014-A5E0-DFE04B00B28B',
        FY_GCTZ_ZQ: 'DBDDC331-5780-42E8-A370-B2541E3C76F8',
        FY_GCTZ_CZ: 'DC30DC15-45B1-46E3-8A55-8E7316D6DA63',
        FY_GCTZ_GJ: '68D89C3A-880D-4475-8556-2C49893199E6',
        FY_GCTZ_LJ: '132E423E-9D03-44D8-84E7-81B6A5EC4DF0',
        FY_GCTZ_CJ: 'D2458F7B-7B3A-4540-A689-A1A2437D7ABF',
        FY_GCTZ_QS: 'CA60811E-3D20-4D15-8CD4-16E8575E9D57',
        FY_GCTZ_SY: '13A8C4A3-7C4C-4E19-9CF1-339836D21D70',
        FY_GCTZ_AQ_XJ: 'E5F04AE3-7C0B-4B03-8F69-AEA36ACFB44D',
        FY_GCTZ_AQ_ZJ: '80124D7C-D8A9-4E32-892A-0101DD384426',
        FY_GCTZ_AQ_YL: '7B099C51-C004-4A83-BB87-60C90A497449',
        FY_JFTZ_XJ: '2B42DA3A-DC7F-4668-89DE-E97253D75E3F',
        FY_JFTZ_ZD: '1813BC3C-9EC2-4AB5-8056-E9C7493CCB7A',
        FY_JFTZ_TG: 'A427CA74-FE80-4482-BE29-76A5AC3FA641',
        FY_JFTZ_YG: 'B738EFBD-22D1-4C03-9653-5D5C1494237C',
        FY_JFTZ_ZCJ: 'C121B019-02A2-471C-8C2E-F16EB4CC2C50',
        FY_JFTZ_YLY: '57F74445-53B3-4845-8603-C4B14450793F',
        FY_JFTZ_GLF: 'F6285390-4956-4EEC-83C7-2C60D75B3304',
        FY_JFTZ_QT: '81F5390F-79EB-4FCF-9D94-DC37052EAC15',
        FY_QZ_TG: '20879A03-AB78-416F-ABEB-7E7D8BF493C7',
        FY_QZ_NJ: '111CBD2E-D22F-429D-9032-3753D4CBDF75',
        Guid: '列GUID',
        RecordName: '',
        _xh: '',
    },
    {
        ExtendedAttributeNumber1: '23',
        ExtendedAttributeNumber2: '8.66',
        csb_6: '27080',
        FY_GC_HJ: '',
        FY_GC_ZJ_XJ: '',
        FY_GC_ZJ_ZQ: '',
        FY_GC_ZJ_CZ: '',
        FY_GC_ZJ_GJ: '',
        FY_GC_ZJ_LJ: '',
        FY_GC_ZJ_CJ: '',
        FY_GC_ZJ_QS: '',
        FY_GC_SY: '',
        FY_AQM_HJ: '',
        FY_AQM_ZJ: '',
        FY_AQM_YL: '',
        FY_DJ_HJ: '',
        FY_DJ_ZJ_XJ: '',
        FY_DJ_ZJ_ZQ: '',
        FY_DJ_ZJ_CZ: '',
        FY_DJ_ZJ_GJ: '',
        FY_DJ_ZJ_LJ: '',
        FY_DJ_ZJ_CJ: '',
        FY_DJ_ZJ_QS: '',
        FY_DJ_SY: '',
        FY_AQK_HJ: '',
        FY_AQK_ZJ: '',
        FY_AQK_YL: '',
        FY_JF_ZD_ZL: '',
        FY_JF_ZD_FY: '',
        FY_JF_ZD_KJ: '',
        FY_JF_ZD_JG: '',
        FY_JF_ZD_CB: '',
        FY_JF_TG: '',
        FY_JF_YG: '',
        FY_JF_ZCJ: '',
        FY_JF_HGL: '',
        FY_JF_JD: '',
        FY_JF_LX: '',
        FY_JF_HJ: '',
        FY_ZTZ_HJ: '',
        FY_ZTZ_JS: '',
        FY_ZTZ_JF: '',
        FY_ZTZ_GL: '',
        FY_GCTZ_XJ: '',
        FY_GCTZ_ZQ: '',
        FY_GCTZ_CZ: '',
        FY_GCTZ_GJ: '',
        FY_GCTZ_LJ: '',
        FY_GCTZ_CJ: '',
        FY_GCTZ_QS: '',
        FY_GCTZ_SY: '',
        FY_GCTZ_AQ_XJ: '',
        FY_GCTZ_AQ_ZJ: '',
        FY_GCTZ_AQ_YL: '',
        FY_JFTZ_XJ: '',
        FY_JFTZ_ZD: '',
        FY_JFTZ_TG: '',
        FY_JFTZ_YG: '',
        FY_JFTZ_ZCJ: '',
        FY_JFTZ_YLY: '',
        FY_JFTZ_GLF: '',
        FY_JFTZ_QT: '',
        FY_QZ_TG: '',
        FY_QZ_NJ: '',
        Guid: '50c89e31-167b-40b4-a35a-6148c5bdf2fe',
        RecordName: '天然气勘探井',
        _xh: '一',
    },
    {
        ExtendedAttributeNumber1: '18',
        ExtendedAttributeNumber2: '6.42',
        csb_6: '22600',
        FY_GC_HJ: '',
        FY_GC_ZJ_XJ: '',
        FY_GC_ZJ_ZQ: '',
        FY_GC_ZJ_CZ: '',
        FY_GC_ZJ_GJ: '',
        FY_GC_ZJ_LJ: '',
        FY_GC_ZJ_CJ: '',
        FY_GC_ZJ_QS: '',
        FY_GC_SY: '',
        FY_AQM_HJ: '',
        FY_AQM_ZJ: '',
        FY_AQM_YL: '',
        FY_DJ_HJ: '',
        FY_DJ_ZJ_XJ: '',
        FY_DJ_ZJ_ZQ: '',
        FY_DJ_ZJ_CZ: '',
        FY_DJ_ZJ_GJ: '',
        FY_DJ_ZJ_LJ: '',
        FY_DJ_ZJ_CJ: '',
        FY_DJ_ZJ_QS: '',
        FY_DJ_SY: '',
        FY_AQK_HJ: '',
        FY_AQK_ZJ: '',
        FY_AQK_YL: '',
        FY_JF_ZD_ZL: '',
        FY_JF_ZD_FY: '',
        FY_JF_ZD_KJ: '',
        FY_JF_ZD_JG: '',
        FY_JF_ZD_CB: '',
        FY_JF_TG: '',
        FY_JF_YG: '',
        FY_JF_ZCJ: '',
        FY_JF_HGL: '',
        FY_JF_JD: '',
        FY_JF_LX: '',
        FY_JF_HJ: '',
        FY_ZTZ_HJ: '',
        FY_ZTZ_JS: '',
        FY_ZTZ_JF: '',
        FY_ZTZ_GL: '',
        FY_GCTZ_XJ: '',
        FY_GCTZ_ZQ: '',
        FY_GCTZ_CZ: '',
        FY_GCTZ_GJ: '',
        FY_GCTZ_LJ: '',
        FY_GCTZ_CJ: '',
        FY_GCTZ_QS: '',
        FY_GCTZ_SY: '',
        FY_GCTZ_AQ_XJ: '',
        FY_GCTZ_AQ_ZJ: '',
        FY_GCTZ_AQ_YL: '',
        FY_JFTZ_XJ: '',
        FY_JFTZ_ZD: '',
        FY_JFTZ_TG: '',
        FY_JFTZ_YG: '',
        FY_JFTZ_ZCJ: '',
        FY_JFTZ_YLY: '',
        FY_JFTZ_GLF: '',
        FY_JFTZ_QT: '',
        FY_QZ_TG: '',
        FY_QZ_NJ: '',
        Guid: 'b94d7f87-77c3-433c-b205-f1f58a15a425',
        RecordName: '    直井',
        _xh: '（一）',
    },
];

export { headsXNGD, testData };